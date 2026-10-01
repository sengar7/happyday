"use client";

import { useMemo, useRef, useState } from "react";

type TrieNode = { children: Map<string, TrieNode>; words: string[] };
const makeNode = (): TrieNode => ({ children: new Map(), words: [] });

/** Prefix lookup is O(prefix length + matches), independent of dictionary size. */
class Trie {
  private root = makeNode();
  constructor(words: string[]) { words.forEach((word) => this.insert(word)); }
  insert(word: string) {
    let node = this.root;
    for (const char of word.toLowerCase()) {
      if (!node.children.has(char)) node.children.set(char, makeNode());
      node = node.children.get(char)!;
      if (!node.words.includes(word)) node.words.push(word);
    }
  }
  search(prefix: string, limit = 8) {
    let node = this.root;
    for (const char of prefix.toLowerCase()) {
      const next = node.children.get(char);
      if (!next) return [];
      node = next;
    }
    return node.words.slice(0, limit);
  }
  get nodeCount() {
    let count = 0;
    const visit = (node: TrieNode) => { count++; node.children.forEach(visit); };
    visit(this.root);
    return count;
  }
}

const initialCommands = [
  "git status", "git add .", "git add -p", "git commit -m \"message\"", "git push origin main",
  "git pull --rebase", "git checkout -b feature/name", "git log --oneline", "git diff", "git stash",
  "npm install", "npm run dev", "npm run build", "npm run lint", "npm test", "npx next dev",
  "docker compose up", "docker compose down", "docker ps", "docker logs -f app", "kubectl get pods",
  "kubectl describe pod", "python -m venv .venv", "python manage.py runserver", "pytest -q", "cargo build",
  "cargo test", "go run .", "go test ./...", "ls -la", "cd ..", "mkdir new-folder", "touch README.md",
  "cat package.json", "grep -R \"TODO\" .", "find . -name \"*.ts\"", "ssh user@host", "curl -I https://example.com",
];

function highlight(text: string, prefix: string) {
  const index = text.toLowerCase().indexOf(prefix.toLowerCase());
  if (!prefix || index < 0) return text;
  return <>{text.slice(0, index)}<strong className="match-text">{text.slice(index, index + prefix.length)}</strong>{text.slice(index + prefix.length)}</>;
}

export default function Home() {
  const [commands, setCommands] = useState(initialCommands);
  const [input, setInput] = useState("");
  const [active, setActive] = useState(0);
  const [history, setHistory] = useState<string[]>(["git status", "npm run dev"]);
  const [notice, setNotice] = useState("Type to search your command history");
  const inputRef = useRef<HTMLInputElement>(null);
  const trie = useMemo(() => new Trie(commands), [commands]);
  const suggestions = useMemo(() => input.trim() ? trie.search(input.trim()) : [], [input, trie]);
  const select = (command: string) => { setInput(command); setNotice("Suggestion loaded · press Enter to run"); inputRef.current?.focus(); };
  const run = (command = input.trim()) => {
    if (!command) return;
    setHistory((items) => [command, ...items.filter((item) => item !== command)].slice(0, 5));
    setCommands((items) => items.includes(command) ? items : [command, ...items]);
    setInput(""); setNotice(`Added to recent history · ${command}`); setActive(0);
  };
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" && suggestions.length) { event.preventDefault(); setActive((n) => (n + 1) % suggestions.length); }
    if (event.key === "ArrowUp" && suggestions.length) { event.preventDefault(); setActive((n) => (n - 1 + suggestions.length) % suggestions.length); }
    if (event.key === "Tab" && suggestions[active]) { event.preventDefault(); select(suggestions[active]); }
    if (event.key === "Enter") { event.preventDefault(); run(suggestions[active] ?? input); }
    if (event.key === "Escape") { setInput(""); setNotice("Search cleared"); }
  };

  return (
    <main className="app-shell">
      <header className="topbar"><a className="brand" href="#home" aria-label="Prefix home"><span className="brand-mark">p<span>_</span></span><span>prefix<span className="brand-dot">.</span></span></a><nav><a className="nav-active" href="#playground">Playground</a><a href="#how-it-works">How it works</a><a href="https://en.wikipedia.org/wiki/Trie" target="_blank" rel="noreferrer">Docs <span className="external">↗</span></a></nav><div className="top-right"><span className="live-dot"/> Engine ready <kbd>⌘ K</kbd></div></header>
      <section className="hero" id="home"><div className="eyebrow"><span className="eyebrow-line"/> BUILT FOR THE FLOW STATE</div><h1>Less typing.<br/><span>More shipping.</span></h1><p className="hero-copy">A tiny, blazing-fast command autocomplete engine.<br className="desktop-break"/> Type a prefix and let the Trie do the rest.</p>
        <div className="terminal-window" id="playground"><div className="terminal-top"><div className="traffic"><i/><i/><i/></div><span className="terminal-title">zsh — command playground</span><button className="reset-btn" onClick={() => { setInput(""); setCommands(initialCommands); setHistory(["git status", "npm run dev"]); setNotice("Demo reset · ready for a new command"); }}>↻ <span>Reset demo</span></button></div>
          <div className="terminal-body"><div className="prompt-row"><span className="prompt-symbol">❯</span><input ref={inputRef} value={input} onChange={(e) => { setInput(e.target.value); setActive(0); setNotice(e.target.value ? "Searching the prefix tree…" : "Type to search your command history"); }} onKeyDown={onKeyDown} placeholder="Start typing a command…" aria-label="Command prefix" autoComplete="off" spellCheck={false}/><span className="cursor-block"/></div>
            {input.trim() ? <div className="suggestion-list" role="listbox" aria-label="Command suggestions">{suggestions.length ? suggestions.map((item, index) => <button key={item} role="option" aria-selected={index === active} className={`suggestion ${index === active ? "selected" : ""}`} onMouseEnter={() => setActive(index)} onClick={() => select(item)}><span className="suggestion-icon">↳</span><span>{highlight(item, input.trim())}</span><span className="suggestion-hint">{index === active ? "↵" : "TAB"}</span></button>) : <div className="empty-state">No match yet. Press <kbd>Enter</kbd> to add <code>{input}</code> to your history.</div>}</div> : <div className="terminal-hint"><span className="hint-pulse"/>{notice}</div>}
            <div className="terminal-bottom"><span><span className="shell-dot"/> zsh</span><span><kbd>↑</kbd><kbd>↓</kbd> navigate <span className="key-space"/><kbd>↵</kbd> run <span className="key-space"/><kbd>Tab</kbd> complete</span></div>
          </div>
        </div>
        <div className="proof-row"><span><b>⌁</b> In-memory lookup</span><i/><span><b>↯</b> Zero dependencies</span><i/><span><b>◉</b> Built from scratch</span></div>
      </section>
      <section className="workspace"><div className="section-heading"><div><div className="section-kicker">UNDER THE HOOD</div><h2>Small structure. <span>Big speed.</span></h2></div><p>Every command becomes a path.<br/>Every prefix becomes a shortcut.</p></div>
        <div className="cards" id="how-it-works"><article className="info-card tree-card"><div className="card-heading"><span>01 / THE STRUCTURE</span><span className="mini-tag">TRIE</span></div><h3>One character at a time.</h3><p>Commands share branches, so the engine only follows the characters you’ve typed.</p><div className="tree-visual" aria-label="Trie illustration"><div className="tree-root">⌂</div><div className="tree-branches"><div className="tree-branch"><span>g</span><div><i>i</i><div className="leaf-row"><b>t</b><em> </em><em>s</em></div></div></div><div className="tree-branch branch-n"><span>n</span><div><i>p</i><div className="leaf-row"><b>m</b><em> </em><em>r</em></div></div></div></div><div className="tree-labels"><span>git status</span><span>npm run dev</span></div></div></article>
          <article className="info-card speed-card"><div className="card-heading"><span>02 / THE COMPLEXITY</span><span className="mini-tag green-tag">FAST BY DESIGN</span></div><h3>Speed that scales.</h3><p>Lookup follows the prefix, then returns its matches. No full-list scan on every keystroke.</p><div className="complexity"><div className="complexity-label"><span>Prefix lookup</span><strong>O(k + m)</strong></div><div className="chart"><div className="chart-line"/><div className="chart-line line-two"/><div className="chart-area"/><span className="chart-y">LOOKUP TIME</span><span className="chart-x">PREFIX LENGTH →</span></div><div className="complexity-foot"><span><i className="chart-legend"/> Trie traversal</span><span>k = prefix length · m = matches</span></div></div></article>
          <article className="info-card history-card"><div className="card-heading"><span>03 / YOUR HISTORY</span><span className="mini-tag amber-tag">LEARNS AS YOU GO</span></div><h3>Your commands, on tap.</h3><p>Run a new command and it joins the index immediately, ready for next time.</p><div className="history-list">{history.slice(0, 3).map((item, index) => <button key={item} onClick={() => select(item)}><span className="history-chevron">›</span><code>{item}</code><span className="history-time">{index === 0 ? "just now" : `${index * 2}m ago`}</span></button>)}</div><div className="history-foot"><span className="history-status"/> Synced to this session <span className="history-count">{commands.length} commands</span></div></article></div>
      </section>
      <footer className="footer"><a className="brand footer-brand" href="#home"><span className="brand-mark">p<span>_</span></span><span>prefix<span className="brand-dot">.</span></span></a><span>Made for the command line, with a little less friction.</span><span className="footer-right">Trie powered <b>✳</b></span></footer>
      <div className="engine-badge"><span className="live-dot"/> ENGINE ONLINE <span>·</span> {trie.nodeCount.toLocaleString()} NODES</div>
    </main>
  );
}
