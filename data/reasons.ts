export type Reason = {
  id: number;
  text: string;
};

const reasonLines = `You make ordinary days feel lighter.
You listen with your whole heart.
Your laugh is my favorite sound.
You make space for the real me.
You remember the little things.
You are kind when nobody is watching.
You make me feel understood.
You turn plans into adventures.
You are beautifully honest.
You make home feel like a person.
You believe in me on the hard days.
You notice what others miss.
You make every inside joke better.
You have the warmest heart.
You are patient with me.
You make me want to grow.
You find joy in small moments.
You are my calm in the noise.
You make me feel lucky.
You have the sweetest smile.
You show up, again and again.
You make every conversation count.
You are brave in your own way.
You see beauty everywhere.
You are exactly yourself.
You make kindness look effortless.
You make the future feel exciting.
You know how to make me laugh.
You make even silence feel easy.
You care deeply.
You have a way with words.
You are my favorite notification.
You make boring errands fun.
You are stronger than you know.
You celebrate my wins like your own.
You never stop surprising me.
You make every room warmer.
You have impeccable taste in us.
You know when I need a hug.
You make me feel safe to dream.
You are thoughtful without trying.
You bring color into my life.
You make time feel softer.
You have the gentlest soul.
You are always worth choosing.
You let me be silly.
You make the best memories with me.
You are the best part of my day.
You make love feel simple.
You are wonderfully curious.
You make me feel seen.
You are my favorite teammate.
You make patience feel possible.
You are full of quiet magic.
You never let me feel alone.
You have the loveliest mind.
You make every season better.
You make me smile without a reason.
You are so easy to admire.
You make space for joy.
You are my comfort place.
You are always learning.
You make every photo brighter.
You make the world feel friendlier.
You are my favorite person to tell things to.
You make mornings more hopeful.
You make late nights sweeter.
You make me feel like I belong.
You are a beautiful kind of rare.
You find the good in people.
You keep my heart curious.
You make the tiny things memorable.
You inspire my softest thoughts.
You are a lovely surprise, every day.
You make life feel less serious.
You are so easy to trust.
You bring out my best smile.
You make every celebration sweeter.
You are my favorite plot twist.
You make being loved feel peaceful.
You have the best energy.
You make me want to take more pictures.
You understand my weirdness.
You make ordinary places special.
You are endlessly worth knowing.
You make me feel incredibly grateful.
You have a heart I want to protect.
You make every hello feel special.
You are patient with the journey.
You give the best kind of comfort.
You make love feel like a verb.
You are my favorite place to return to.
You make me believe in good things.
You are the softest part of my life.
You make every day more ours.
You are impossible not to adore.
You make me feel more like myself.
You are a gift to everyone around you.
You make the world feel a little more golden.
You are my forever favorite.
You are you—and that is more than enough.
You are the best thing that happened to me.`;

export const reasons: readonly Reason[] = reasonLines.split("\n").map((text, index) => ({
  id: index + 1,
  text,
}));
