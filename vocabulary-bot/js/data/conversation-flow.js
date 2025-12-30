/**
 * Conversation Flow System
 * Defines natural dialogue patterns and tone modifiers
 */

const ConversationFlow = {
    // Conversation contexts that create natural dialogue
    contexts: {
        greeting: {
            easy: ["Hi!", "Hello!", "Hey there!", "Good morning!", "Good afternoon!", "Hey!", "Hi there!", "Hello there!"],
            medium: ["Hey, how's it going?", "Good to see you!", "Hello, how are you today?", "Hey, what's up?", "How are things?", "Nice to see you!"],
            hard: ["I trust you're doing well today.", "Greetings, I hope this finds you in good spirits.", "Good day to you.", "I hope you're having a pleasant day."]
        },
        response_greeting: {
            easy: ["I'm good, thanks!", "Pretty good!", "I'm fine!", "Not bad!", "Doing great!", "All good here!", "Can't complain!"],
            medium: ["I'm doing well, thank you for asking.", "Can't complain!", "Things are going smoothly.", "Everything's fine, thanks!", "Pretty well, actually.", "Quite good, thank you."],
            hard: ["I appreciate you asking. Things are progressing quite well.", "All things considered, I'm doing remarkably well.", "I'm doing splendidly, thank you for inquiring.", "Quite well, I must say."]
        },
        topic_intro: {
            easy: [
                "So, I wanted to talk about the {noun}.",
                "Hey, did you see the {noun}?",
                "I've been thinking about the {noun}.",
                "Have you noticed the {noun} lately?",
                "What about the {noun}?",
                "Did you hear about the {noun}?",
                "I saw the {noun} today.",
                "The {noun} caught my attention."
            ],
            medium: [
                "I've been meaning to discuss the {noun} with you.",
                "There's something about the {noun} I wanted to mention.",
                "The {noun} has been on my mind lately.",
                "Speaking of work, what do you think about the {noun}?",
                "I wanted to bring up the {noun}.",
                "Have you had any thoughts about the {noun}?",
                "I've noticed something interesting about the {noun}.",
                "Let me tell you about the {noun}."
            ],
            hard: [
                "I've been contemplating the implications of the {noun}.",
                "There's a matter regarding the {noun} that warrants our attention.",
                "I believe the {noun} deserves careful consideration.",
                "I'd like to draw your attention to the {noun}.",
                "Perhaps we should discuss the {noun} in more detail.",
                "The {noun} presents an interesting case for discussion."
            ]
        },
        agreement: {
            easy: [
                "Yes, totally!", "I know, right?", "Exactly!", "That's true!",
                "Absolutely!", "For sure!", "I agree!", "You're right!",
                "Definitely!", "Same here!", "I think so too!", "True!"
            ],
            medium: [
                "I completely agree with you.", "You make a valid point.", "That's exactly what I was thinking.",
                "I couldn't agree more.", "You're absolutely right.", "That makes a lot of sense.",
                "I share your opinion.", "My thoughts exactly.", "That's a great point."
            ],
            hard: [
                "Your observation is quite astute.", "I concur with your assessment.", "Indeed, that aligns with my perspective.",
                "I find myself in complete agreement.", "Your point is well-taken.", "That's a remarkably insightful observation.",
                "I wholeheartedly agree with that sentiment.", "Your reasoning is quite sound."
            ]
        },
        elaboration: {
            easy: [
                "And the {noun} is really {adjective}.",
                "I think it's quite {adjective}.",
                "It seems very {adjective} to me.",
                "The {noun} looks {adjective}.",
                "I find the {noun} {adjective}.",
                "The {noun} feels {adjective}.",
                "It's pretty {adjective}, isn't it?",
                "I noticed the {noun} is {adjective}.",
                "The {noun} seems {adjective} lately.",
                "That {noun} is so {adjective}!"
            ],
            medium: [
                "Moreover, the {noun} appears to be {adjective}.",
                "What's interesting is how {adjective} the {noun} has become.",
                "I've noticed the {noun} is increasingly {adjective}.",
                "The {noun} has proven to be quite {adjective}.",
                "It's worth noting that the {noun} is rather {adjective}.",
                "I've come to find the {noun} surprisingly {adjective}.",
                "The more I think about it, the more {adjective} the {noun} seems.",
                "One thing I've observed is that the {noun} is {adjective}.",
                "Interestingly, the {noun} can be quite {adjective}."
            ],
            hard: [
                "Furthermore, one cannot overlook how {adjective} the {noun} has proven to be.",
                "The {adjective} nature of the {noun} is particularly noteworthy.",
                "It's worth mentioning that the {noun} demonstrates {adjective} characteristics.",
                "Upon closer examination, the {noun} reveals itself to be remarkably {adjective}.",
                "The inherently {adjective} quality of the {noun} cannot be understated.",
                "One might argue that the {noun} is fundamentally {adjective} in nature.",
                "The {noun} exhibits distinctly {adjective} properties.",
                "It bears mentioning that the {noun} is exceptionally {adjective}."
            ]
        },
        question: {
            easy: [
                "What do you think about it?",
                "Don't you agree?",
                "Have you seen it?",
                "Did you know that?",
                "What do you think?",
                "Do you like it?",
                "Have you tried it?",
                "Can you believe it?",
                "Isn't that interesting?",
                "What's your opinion?"
            ],
            medium: [
                "What's your take on this?",
                "How do you feel about the situation?",
                "Have you given this much thought?",
                "Would you agree with that assessment?",
                "What are your thoughts on the matter?",
                "Do you see it the same way?",
                "How would you approach this?",
                "What's your perspective on this?",
                "Have you encountered something similar?",
                "What would you suggest?"
            ],
            hard: [
                "What insights might you offer on this matter?",
                "How would you characterize the current state of affairs?",
                "Would you concur with this interpretation?",
                "What conclusions have you drawn from this?",
                "How do you perceive the situation?",
                "What factors do you consider most relevant?",
                "How might we approach this more effectively?",
                "What alternative perspectives should we consider?"
            ]
        },
        answer: {
            easy: [
                "Well, I think the {noun} is {adjective}.",
                "In my opinion, it's really {adjective}.",
                "I'd say it's quite {adjective}.",
                "I think the {noun} is pretty {adjective}.",
                "To me, the {noun} seems {adjective}.",
                "I feel like it's {adjective}.",
                "Honestly, I find it {adjective}.",
                "I believe the {noun} is {adjective}.",
                "From what I see, it's {adjective}.",
                "My view is that it's {adjective}."
            ],
            medium: [
                "Based on my experience, the {noun} tends to be {adjective}.",
                "From what I've observed, I'd say it's {adjective}.",
                "Considering everything, I believe it's {adjective}.",
                "In my assessment, the {noun} is quite {adjective}.",
                "I would characterize the {noun} as {adjective}.",
                "My impression is that the {noun} is {adjective}.",
                "Looking at the evidence, it seems {adjective}.",
                "I've found the {noun} to be generally {adjective}.",
                "From my perspective, it's decidedly {adjective}."
            ],
            hard: [
                "After careful consideration, I would posit that the {noun} is inherently {adjective}.",
                "My assessment suggests that the {noun} is fundamentally {adjective}.",
                "Upon reflection, I'm inclined to characterize the {noun} as {adjective}.",
                "Having analyzed the situation, I conclude that the {noun} is {adjective}.",
                "My evaluation leads me to believe the {noun} is decidedly {adjective}.",
                "Taking all factors into account, the {noun} appears to be {adjective}.",
                "Based on thorough analysis, I would describe the {noun} as {adjective}.",
                "From a comprehensive standpoint, the {noun} is undeniably {adjective}."
            ]
        },
        transition: {
            easy: [
                "By the way,", "Oh, and", "Also,", "Speaking of which,",
                "Anyway,", "So,", "Oh,", "You know what,",
                "And another thing,", "Plus,", "On top of that,"
            ],
            medium: [
                "On a related note,", "That reminds me,", "Interestingly,", "Moving on,",
                "Come to think of it,", "While we're on the topic,", "That said,",
                "Which brings me to,", "Speaking of that,", "Along those lines,"
            ],
            hard: [
                "This brings me to another point:", "In a similar vein,", "Furthermore,",
                "This naturally leads to the question of", "Building on that thought,",
                "To extend this discussion,", "Relatedly,", "This segues nicely into",
                "Continuing this line of reasoning,"
            ]
        },
        closing: {
            easy: [
                "Anyway, I should go.", "See you later!", "Talk to you soon!", "Bye for now!",
                "Gotta run!", "Catch you later!", "Take care!", "See you!",
                "I'll talk to you later.", "Have a good one!"
            ],
            medium: [
                "Well, I should probably get going.", "It was great talking to you.", "Let's catch up again soon.",
                "I should head out now.", "Thanks for the chat!", "Let's continue this later.",
                "I appreciate the conversation.", "We should do this again.", "Until next time!"
            ],
            hard: [
                "I should take my leave now.", "This has been a most enlightening discussion.",
                "I look forward to continuing this dialogue.", "It has been a pleasure conversing with you.",
                "I shall bid you farewell for now.", "Let us reconvene at a later time.",
                "I appreciate this thoughtful exchange.", "Until we meet again."
            ]
        }
    },

    // Tone adjustments
    toneModifiers: {
        formal: {
            prefix: ["I believe that", "It would appear that", "One might observe that", "It seems to me that", "I would suggest that", "One could argue that"],
            suffix: ["if I may say so.", "wouldn't you agree?", "as it were.", "so to speak.", "one might say.", "if you will."]
        },
        informal: {
            prefix: ["Honestly,", "You know,", "Like,", "So basically,", "I mean,", "Actually,", "To be honest,", "Look,"],
            suffix: ["you know?", "right?", "or whatever.", "and stuff.", "I guess.", "or something.", "kinda.", "pretty much."]
        },
        neutral: {
            prefix: ["I think", "It seems like", "In my view,", "I feel that", "It appears that", "I'd say"],
            suffix: [".", "I suppose.", "in my opinion.", "I believe.", "from what I can tell.", "as I see it."]
        }
    }
};
