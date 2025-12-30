/**
 * Natural Dialogue Database
 * Pre-written conversation exchanges that flow naturally
 * Each exchange is a pair/group of lines that make sense together
 */

const DialogueDatabase = {
    office: {
        easy: {
            // Opening exchanges
            openings: [
                [
                    { speaker: 'A', text: "Hey, good morning! How are you today?" },
                    { speaker: 'B', text: "Morning! I'm doing well, thanks. A bit tired though." },
                    { speaker: 'A', text: "Late night? I had trouble sleeping too." },
                    { speaker: 'B', text: "Yeah, I was finishing up some work. You know how it is." }
                ],
                [
                    { speaker: 'A', text: "Hi there! Did you have a good weekend?" },
                    { speaker: 'B', text: "It was great, thanks! I finally got some rest. How about you?" },
                    { speaker: 'A', text: "Pretty relaxing. I mostly stayed home and watched movies." },
                    { speaker: 'B', text: "That sounds nice. Sometimes we all need a quiet weekend." }
                ],
                [
                    { speaker: 'A', text: "Good morning! You're here early today." },
                    { speaker: 'B', text: "Yeah, I wanted to get a head start on some emails." },
                    { speaker: 'A', text: "Smart idea. The inbox can get crazy by noon." },
                    { speaker: 'B', text: "Exactly! Better to tackle it while it's quiet." }
                ]
            ],
            // Middle conversation exchanges
            discussions: [
                [
                    { speaker: 'A', text: "Did you see the email about the meeting?" },
                    { speaker: 'B', text: "Yes, it's at 3 PM, right? I already blocked my calendar." },
                    { speaker: 'A', text: "Good thinking. I heard the boss has some news for us." },
                    { speaker: 'B', text: "Really? I hope it's good news!" }
                ],
                [
                    { speaker: 'A', text: "My computer has been so slow lately." },
                    { speaker: 'B', text: "Have you tried restarting it? That usually helps." },
                    { speaker: 'A', text: "I did, but it's still taking forever to load." },
                    { speaker: 'B', text: "Maybe you should call IT. They fixed mine last week." }
                ],
                [
                    { speaker: 'A', text: "I need to finish this report by tomorrow." },
                    { speaker: 'B', text: "That's a tight deadline. Do you need any help?" },
                    { speaker: 'A', text: "Actually, yes! Could you check the numbers for me?" },
                    { speaker: 'B', text: "Sure, send it over and I'll take a look this afternoon." }
                ],
                [
                    { speaker: 'A', text: "Want to grab some coffee? I need a break." },
                    { speaker: 'B', text: "Absolutely! I've been staring at this screen for hours." },
                    { speaker: 'A', text: "Same here. My eyes are getting tired." },
                    { speaker: 'B', text: "Let's go. A short break will help us focus better." }
                ],
                [
                    { speaker: 'A', text: "Have you met the new team member yet?" },
                    { speaker: 'B', text: "Not yet. I heard they started on Monday." },
                    { speaker: 'A', text: "Yes, they seem really nice. Very friendly." },
                    { speaker: 'B', text: "Great! I'll introduce myself at lunch." }
                ],
                [
                    { speaker: 'A', text: "The phone has been ringing all morning!" },
                    { speaker: 'B', text: "I know! It's been a busy day for everyone." },
                    { speaker: 'A', text: "I haven't even had time to check my emails." },
                    { speaker: 'B', text: "Things should calm down after lunch hopefully." }
                ]
            ],
            // Closing exchanges
            closings: [
                [
                    { speaker: 'A', text: "Well, I should get back to work now." },
                    { speaker: 'B', text: "Yeah, me too. Talk to you later!" },
                    { speaker: 'A', text: "Sure thing. Have a good rest of your day!" },
                    { speaker: 'B', text: "You too! Good luck with that report." }
                ],
                [
                    { speaker: 'A', text: "I have a call in five minutes, so I better go." },
                    { speaker: 'B', text: "No problem. Thanks for the chat!" },
                    { speaker: 'A', text: "Anytime! Let's catch up again soon." },
                    { speaker: 'B', text: "Definitely. See you around!" }
                ]
            ]
        },
        medium: {
            openings: [
                [
                    { speaker: 'A', text: "Good morning! Ready for another busy week?" },
                    { speaker: 'B', text: "As ready as I'll ever be! I've got three deadlines this week." },
                    { speaker: 'A', text: "That sounds intense. Anything I can help with?" },
                    { speaker: 'B', text: "Thanks for offering! I might take you up on that." }
                ],
                [
                    { speaker: 'A', text: "Hey, did you get a chance to review the proposal?" },
                    { speaker: 'B', text: "I did, actually. I have some thoughts if you have a minute." },
                    { speaker: 'A', text: "Perfect timing. I was hoping to discuss it before the meeting." },
                    { speaker: 'B', text: "Great minds think alike! Let me grab my notes." }
                ]
            ],
            discussions: [
                [
                    { speaker: 'A', text: "The project timeline seems a bit ambitious, don't you think?" },
                    { speaker: 'B', text: "I was thinking the same thing. We might need more resources." },
                    { speaker: 'A', text: "Should we bring this up with the project manager?" },
                    { speaker: 'B', text: "Definitely. Better to address it now than scramble later." }
                ],
                [
                    { speaker: 'A', text: "I've been trying to prioritize my tasks, but everything seems urgent." },
                    { speaker: 'B', text: "I know the feeling. Have you tried the priority matrix approach?" },
                    { speaker: 'A', text: "I've heard of it but never actually used it. Does it work?" },
                    { speaker: 'B', text: "It's been helpful for me. I can show you how I use it." }
                ],
                [
                    { speaker: 'A', text: "The client wants to schedule another call this week." },
                    { speaker: 'B', text: "Are they happy with how things are progressing?" },
                    { speaker: 'A', text: "Mostly, but they have some concerns about the schedule." },
                    { speaker: 'B', text: "We should prepare some solutions before the call then." }
                ],
                [
                    { speaker: 'A', text: "Have you worked with the new collaboration software?" },
                    { speaker: 'B', text: "A little bit. It's different from what we used before." },
                    { speaker: 'A', text: "I'm still getting used to it. Some features are confusing." },
                    { speaker: 'B', text: "There's a training session next week if you're interested." }
                ],
                [
                    { speaker: 'A', text: "My workload has really increased this quarter." },
                    { speaker: 'B', text: "Same here. The team is stretched pretty thin right now." },
                    { speaker: 'A', text: "Maybe we should discuss this at the team meeting." },
                    { speaker: 'B', text: "Good idea. Others might be feeling the same way." }
                ]
            ],
            closings: [
                [
                    { speaker: 'A', text: "I should head to my next meeting. This was productive!" },
                    { speaker: 'B', text: "Agreed! Let's sync up again after you talk to the client." },
                    { speaker: 'A', text: "Will do. I'll send you a summary by end of day." },
                    { speaker: 'B', text: "Perfect. Looking forward to it!" }
                ],
                [
                    { speaker: 'A', text: "Thanks for your input on this. Really helpful!" },
                    { speaker: 'B', text: "Happy to help! That's what teammates are for." },
                    { speaker: 'A', text: "Let me know if you need anything from my end." },
                    { speaker: 'B', text: "I will. Good luck with the presentation!" }
                ]
            ]
        },
        hard: {
            openings: [
                [
                    { speaker: 'A', text: "I've been analyzing the quarterly results, and there are some interesting trends." },
                    { speaker: 'B', text: "I noticed that too. The data suggests we need to reconsider our approach." },
                    { speaker: 'A', text: "Exactly. I think we should schedule a strategy session with the stakeholders." },
                    { speaker: 'B', text: "That would be prudent. We need their buy-in before implementing any changes." }
                ]
            ],
            discussions: [
                [
                    { speaker: 'A', text: "The implementation phase is proving more complex than anticipated." },
                    { speaker: 'B', text: "We may need to streamline some of the processes to stay on track." },
                    { speaker: 'A', text: "I've been thinking about leveraging the existing infrastructure." },
                    { speaker: 'B', text: "That could work. It would certainly mitigate some of the risk." }
                ],
                [
                    { speaker: 'A', text: "The stakeholders are requesting a comprehensive progress report." },
                    { speaker: 'B', text: "I can facilitate the data gathering from each department." },
                    { speaker: 'A', text: "That would be tremendously helpful. We need meticulous documentation." },
                    { speaker: 'B', text: "I'll coordinate with the team leads and have something by Thursday." }
                ],
                [
                    { speaker: 'A', text: "We need to think strategically about the resource allocation." },
                    { speaker: 'B', text: "I agree. The current distribution isn't optimizing our capabilities." },
                    { speaker: 'A', text: "Perhaps we should do a deep dive into the operational metrics." },
                    { speaker: 'B', text: "Good thinking. Data-driven decisions will serve us better long-term." }
                ]
            ],
            closings: [
                [
                    { speaker: 'A', text: "This has been a productive discussion. Let's reconvene next week." },
                    { speaker: 'B', text: "Agreed. I'll circulate the action items to all relevant parties." },
                    { speaker: 'A', text: "Excellent. I appreciate your thorough analysis as always." },
                    { speaker: 'B', text: "Thank you. Looking forward to seeing the initiative progress." }
                ]
            ]
        }
    },
    home: {
        easy: {
            openings: [
                [
                    { speaker: 'A', text: "It feels so good to be home after a long day!" },
                    { speaker: 'B', text: "I know what you mean. There's nothing like relaxing at home." },
                    { speaker: 'A', text: "Should we order dinner or cook something?" },
                    { speaker: 'B', text: "Let's cook! I bought some fresh vegetables yesterday." }
                ],
                [
                    { speaker: 'A', text: "The house looks so clean! Did you tidy up?" },
                    { speaker: 'B', text: "Yes, I spent the morning cleaning. It was a mess!" },
                    { speaker: 'A', text: "You did a great job. It looks wonderful." },
                    { speaker: 'B', text: "Thanks! It feels nice to have a clean space." }
                ]
            ],
            discussions: [
                [
                    { speaker: 'A', text: "I was thinking we could reorganize the kitchen." },
                    { speaker: 'B', text: "That's a good idea! It's getting hard to find things." },
                    { speaker: 'A', text: "Maybe we can do it this weekend when we have time." },
                    { speaker: 'B', text: "Perfect. I'll make a list of what we need." }
                ],
                [
                    { speaker: 'A', text: "The garden is looking beautiful this time of year." },
                    { speaker: 'B', text: "I love sitting out there in the evening." },
                    { speaker: 'A', text: "We should plant some new flowers next month." },
                    { speaker: 'B', text: "Yes! Maybe some roses would look nice by the fence." }
                ],
                [
                    { speaker: 'A', text: "What do you want to do tonight? Watch a movie?" },
                    { speaker: 'B', text: "Sure! There's that new comedy everyone's talking about." },
                    { speaker: 'A', text: "Sounds fun. I'll make some popcorn." },
                    { speaker: 'B', text: "And I'll get some blankets. It's a bit cold tonight." }
                ],
                [
                    { speaker: 'A', text: "I think we need to fix that leaky faucet soon." },
                    { speaker: 'B', text: "You're right. The dripping sound is driving me crazy!" },
                    { speaker: 'A', text: "I can call a plumber tomorrow if you want." },
                    { speaker: 'B', text: "That would be great. Better to fix it before it gets worse." }
                ],
                [
                    { speaker: 'A', text: "The kids are finally asleep. What a day!" },
                    { speaker: 'B', text: "They had so much energy today! Running around everywhere." },
                    { speaker: 'A', text: "At least they'll sleep well tonight." },
                    { speaker: 'B', text: "True! Now we can finally have some quiet time." }
                ]
            ],
            closings: [
                [
                    { speaker: 'A', text: "I'm getting sleepy. Should we head to bed?" },
                    { speaker: 'B', text: "Good idea. We have an early morning tomorrow." },
                    { speaker: 'A', text: "I'll lock up and turn off the lights." },
                    { speaker: 'B', text: "Okay. Sleep well!" }
                ],
                [
                    { speaker: 'A', text: "This was such a relaxing evening." },
                    { speaker: 'B', text: "It really was. We should do this more often." },
                    { speaker: 'A', text: "Definitely. Home is the best place to unwind." },
                    { speaker: 'B', text: "Couldn't agree more. Home sweet home!" }
                ]
            ]
        },
        medium: {
            openings: [
                [
                    { speaker: 'A', text: "I've been thinking about redecorating the living room." },
                    { speaker: 'B', text: "Really? What changes do you have in mind?" },
                    { speaker: 'A', text: "Maybe some new furniture and a fresh coat of paint." },
                    { speaker: 'B', text: "That could really transform the space. I like the idea!" }
                ]
            ],
            discussions: [
                [
                    { speaker: 'A', text: "The neighborhood has changed so much over the years." },
                    { speaker: 'B', text: "I know! There are so many new families moving in." },
                    { speaker: 'A', text: "It's nice though. The community feels more lively." },
                    { speaker: 'B', text: "True. And the new coffee shop on the corner is fantastic." }
                ],
                [
                    { speaker: 'A', text: "We really should organize the garage one of these days." },
                    { speaker: 'B', text: "I've been putting it off for months! It's overwhelming." },
                    { speaker: 'A', text: "Let's tackle it together. It'll go faster with two people." },
                    { speaker: 'B', text: "You're right. How about next Saturday morning?" }
                ],
                [
                    { speaker: 'A', text: "I'm considering getting some new appliances for the kitchen." },
                    { speaker: 'B', text: "The old ones have been giving us trouble lately." },
                    { speaker: 'A', text: "Exactly. A new dishwasher would make life so much easier." },
                    { speaker: 'B', text: "Let's check out some options this weekend." }
                ]
            ],
            closings: [
                [
                    { speaker: 'A', text: "Thanks for helping with the housework today." },
                    { speaker: 'B', text: "Of course! We make a good team." },
                    { speaker: 'A', text: "The house looks so much better now." },
                    { speaker: 'B', text: "It does! All that effort was worth it." }
                ]
            ]
        },
        hard: {
            openings: [
                [
                    { speaker: 'A', text: "I've been researching sustainable home improvements." },
                    { speaker: 'B', text: "That's fascinating. What aspects are you focusing on?" },
                    { speaker: 'A', text: "Primarily energy efficiency and reducing our environmental footprint." },
                    { speaker: 'B', text: "Those are worthwhile investments that pay off long-term." }
                ]
            ],
            discussions: [
                [
                    { speaker: 'A', text: "The interior design aesthetics have evolved considerably." },
                    { speaker: 'B', text: "Minimalism seems to be the predominant trend nowadays." },
                    { speaker: 'A', text: "I appreciate the emphasis on functionality and clean lines." },
                    { speaker: 'B', text: "It creates a more serene and organized living environment." }
                ],
                [
                    { speaker: 'A', text: "Maintaining a household requires considerable coordination." },
                    { speaker: 'B', text: "Indeed. Balancing responsibilities can be quite challenging." },
                    { speaker: 'A', text: "Perhaps we should establish a more structured routine." },
                    { speaker: 'B', text: "That would certainly optimize our time management." }
                ]
            ],
            closings: [
                [
                    { speaker: 'A', text: "This conversation has given me much to contemplate." },
                    { speaker: 'B', text: "Likewise. It's refreshing to discuss these matters thoughtfully." },
                    { speaker: 'A', text: "We should continue this dialogue another time." },
                    { speaker: 'B', text: "Absolutely. I look forward to it." }
                ]
            ]
        }
    },
    restaurant: {
        easy: {
            openings: [
                [
                    { speaker: 'A', text: "This place looks nice! Have you been here before?" },
                    { speaker: 'B', text: "No, it's my first time. A friend recommended it." },
                    { speaker: 'A', text: "The menu looks good. So many choices!" },
                    { speaker: 'B', text: "I know! I don't know what to order." }
                ],
                [
                    { speaker: 'A', text: "I'm so hungry! I skipped lunch today." },
                    { speaker: 'B', text: "Me too! Let's order something filling." },
                    { speaker: 'A', text: "Good idea. Maybe we can share a few dishes." },
                    { speaker: 'B', text: "That way we can try more things!" }
                ]
            ],
            discussions: [
                [
                    { speaker: 'A', text: "What are you thinking of getting?" },
                    { speaker: 'B', text: "I'm torn between the pasta and the steak." },
                    { speaker: 'A', text: "The steak looks amazing in the pictures." },
                    { speaker: 'B', text: "You're right. I'll go with the steak then!" }
                ],
                [
                    { speaker: 'A', text: "This bread is delicious! So fresh." },
                    { speaker: 'B', text: "I could eat the whole basket!" },
                    { speaker: 'A', text: "We should save room for the main course though." },
                    { speaker: 'B', text: "True, but one more piece won't hurt." }
                ],
                [
                    { speaker: 'A', text: "How's your food? Is it good?" },
                    { speaker: 'B', text: "It's amazing! Want to try some?" },
                    { speaker: 'A', text: "Yes, please! Here, try some of mine too." },
                    { speaker: 'B', text: "Mmm, that's really tasty! Good choice." }
                ],
                [
                    { speaker: 'A', text: "Should we order dessert?" },
                    { speaker: 'B', text: "I'm pretty full, but that chocolate cake looks tempting." },
                    { speaker: 'A', text: "We could split one?" },
                    { speaker: 'B', text: "Perfect idea! Let's do it." }
                ],
                [
                    { speaker: 'A', text: "The service here is really good." },
                    { speaker: 'B', text: "Yes, our waiter has been so helpful." },
                    { speaker: 'A', text: "We should leave a nice tip." },
                    { speaker: 'B', text: "Definitely. They deserve it." }
                ]
            ],
            closings: [
                [
                    { speaker: 'A', text: "That was a great meal! I'm so full." },
                    { speaker: 'B', text: "Same here. We have to come back again." },
                    { speaker: 'A', text: "For sure! Maybe next month?" },
                    { speaker: 'B', text: "It's a date! I'll put it in my calendar." }
                ],
                [
                    { speaker: 'A', text: "Ready to go? I'll ask for the check." },
                    { speaker: 'B', text: "Sure! Thanks for dinner, this was fun." },
                    { speaker: 'A', text: "My pleasure! We should do this more often." },
                    { speaker: 'B', text: "Agreed! Same time next week?" }
                ]
            ]
        },
        medium: {
            openings: [
                [
                    { speaker: 'A', text: "I made a reservation for seven o'clock. We're a bit early." },
                    { speaker: 'B', text: "That's fine. We can wait at the bar and have a drink." },
                    { speaker: 'A', text: "Great idea. I've heard their cocktails are excellent." },
                    { speaker: 'B', text: "Let's check out their specialty drinks menu." }
                ]
            ],
            discussions: [
                [
                    { speaker: 'A', text: "The chef here trained in Italy, apparently." },
                    { speaker: 'B', text: "That explains why the pasta dishes are so authentic." },
                    { speaker: 'A', text: "I'm impressed by their attention to traditional techniques." },
                    { speaker: 'B', text: "You can really taste the difference in quality." }
                ],
                [
                    { speaker: 'A', text: "Would you like to try some wine with dinner?" },
                    { speaker: 'B', text: "Sure! Do you have any recommendations?" },
                    { speaker: 'A', text: "The sommelier suggested this red with the lamb." },
                    { speaker: 'B', text: "Sounds perfect. Let's go with that." }
                ],
                [
                    { speaker: 'A', text: "I appreciate restaurants that source locally." },
                    { speaker: 'B', text: "It makes such a difference in freshness and flavor." },
                    { speaker: 'A', text: "Plus it supports the local farming community." },
                    { speaker: 'B', text: "Exactly. It's a win-win situation." }
                ]
            ],
            closings: [
                [
                    { speaker: 'A', text: "This has been a wonderful dining experience." },
                    { speaker: 'B', text: "Absolutely. The ambiance and food were both excellent." },
                    { speaker: 'A', text: "I'll definitely be recommending this place to friends." },
                    { speaker: 'B', text: "Me too. It's become one of my new favorites." }
                ]
            ]
        },
        hard: {
            openings: [
                [
                    { speaker: 'A', text: "I've been anticipating this culinary experience for weeks." },
                    { speaker: 'B', text: "The restaurant has garnered quite a reputation in gastronomic circles." },
                    { speaker: 'A', text: "Their innovative approach to traditional cuisine is remarkable." },
                    { speaker: 'B', text: "I'm particularly intrigued by their tasting menu concept." }
                ]
            ],
            discussions: [
                [
                    { speaker: 'A', text: "The presentation of each course is extraordinarily artistic." },
                    { speaker: 'B', text: "The chef clearly considers aesthetics as important as flavor." },
                    { speaker: 'A', text: "It elevates the entire dining experience to another level." },
                    { speaker: 'B', text: "One truly appreciates the craftsmanship involved." }
                ],
                [
                    { speaker: 'A', text: "The wine pairing complements each dish impeccably." },
                    { speaker: 'B', text: "The sommelier has an exceptional understanding of flavor profiles." },
                    { speaker: 'A', text: "Each selection enhances the nuances of the cuisine." },
                    { speaker: 'B', text: "It demonstrates the importance of thoughtful curation." }
                ]
            ],
            closings: [
                [
                    { speaker: 'A', text: "This has been an exceptional gastronomic journey." },
                    { speaker: 'B', text: "Indeed. The attention to detail was impeccable throughout." },
                    { speaker: 'A', text: "We must return to experience their seasonal menu." },
                    { speaker: 'B', text: "I shall make reservations at the earliest opportunity." }
                ]
            ]
        }
    },
    shopping: {
        easy: {
            openings: [
                [
                    { speaker: 'A', text: "I need to buy some new clothes for work." },
                    { speaker: 'B', text: "Let's check out that store over there!" },
                    { speaker: 'A', text: "Good idea. They always have nice things." },
                    { speaker: 'B', text: "And I think they have a sale going on!" }
                ],
                [
                    { speaker: 'A', text: "This mall is huge! Where should we start?" },
                    { speaker: 'B', text: "Let's get a map and make a plan." },
                    { speaker: 'A', text: "Smart thinking. What are you looking for today?" },
                    { speaker: 'B', text: "I need some new shoes and maybe a jacket." }
                ]
            ],
            discussions: [
                [
                    { speaker: 'A', text: "What do you think of this shirt?" },
                    { speaker: 'B', text: "I like the color! It would look great on you." },
                    { speaker: 'A', text: "Really? I wasn't sure about the size." },
                    { speaker: 'B', text: "Try it on! The fitting room is right there." }
                ],
                [
                    { speaker: 'A', text: "These shoes are so comfortable!" },
                    { speaker: 'B', text: "They look nice too. Are they on sale?" },
                    { speaker: 'A', text: "Yes! Fifty percent off. Such a good deal." },
                    { speaker: 'B', text: "You should definitely get them then!" }
                ],
                [
                    { speaker: 'A', text: "I can't decide between these two dresses." },
                    { speaker: 'B', text: "The blue one is more your style, I think." },
                    { speaker: 'A', text: "You're right. And it's more practical too." },
                    { speaker: 'B', text: "Plus it goes with so many things you already have." }
                ],
                [
                    { speaker: 'A', text: "Do you think this is too expensive?" },
                    { speaker: 'B', text: "It's a bit pricey, but the quality looks good." },
                    { speaker: 'A', text: "True. It should last a long time." },
                    { speaker: 'B', text: "Sometimes it's worth spending more for quality." }
                ],
                [
                    { speaker: 'A', text: "I'm getting hungry. Should we take a break?" },
                    { speaker: 'B', text: "Yes! There's a nice café on the second floor." },
                    { speaker: 'A', text: "Perfect. We can rest our feet too." },
                    { speaker: 'B', text: "And plan what shops to visit next!" }
                ]
            ],
            closings: [
                [
                    { speaker: 'A', text: "I found everything I needed today!" },
                    { speaker: 'B', text: "Me too! This was a successful shopping trip." },
                    { speaker: 'A', text: "Thanks for coming with me. It was fun!" },
                    { speaker: 'B', text: "Anytime! Let's do it again soon." }
                ],
                [
                    { speaker: 'A', text: "My bags are getting heavy!" },
                    { speaker: 'B', text: "Mine too! I think we bought enough for today." },
                    { speaker: 'A', text: "Definitely. Time to head home." },
                    { speaker: 'B', text: "Let's find the car and load everything up." }
                ]
            ]
        },
        medium: {
            openings: [
                [
                    { speaker: 'A', text: "I've been meaning to update my wardrobe for the season." },
                    { speaker: 'B', text: "Good timing! Most stores have their new collections in." },
                    { speaker: 'A', text: "I'm looking for something professional but comfortable." },
                    { speaker: 'B', text: "There are some great options in the business casual section." }
                ]
            ],
            discussions: [
                [
                    { speaker: 'A', text: "The quality of clothing has really declined in recent years." },
                    { speaker: 'B', text: "Fast fashion has changed consumer expectations." },
                    { speaker: 'A', text: "I prefer investing in fewer, higher-quality pieces." },
                    { speaker: 'B', text: "That's a more sustainable approach in the long run." }
                ],
                [
                    { speaker: 'A', text: "Have you tried their loyalty program? It's quite rewarding." },
                    { speaker: 'B', text: "I signed up last month. The discounts are substantial." },
                    { speaker: 'A', text: "Plus you get early access to sales and new arrivals." },
                    { speaker: 'B', text: "Definitely worth it if you shop here regularly." }
                ]
            ],
            closings: [
                [
                    { speaker: 'A', text: "This was a productive shopping session." },
                    { speaker: 'B', text: "I found some excellent pieces within my budget." },
                    { speaker: 'A', text: "The key is knowing what you need before you come." },
                    { speaker: 'B', text: "Exactly. It prevents impulse purchases." }
                ]
            ]
        },
        hard: {
            openings: [
                [
                    { speaker: 'A', text: "I'm curating a more intentional wardrobe this year." },
                    { speaker: 'B', text: "The capsule wardrobe concept has gained significant traction." },
                    { speaker: 'A', text: "It emphasizes quality over quantity and versatility." },
                    { speaker: 'B', text: "A refreshingly sustainable approach to fashion consumption." }
                ]
            ],
            discussions: [
                [
                    { speaker: 'A', text: "The retail landscape has transformed dramatically." },
                    { speaker: 'B', text: "E-commerce has fundamentally altered consumer behavior." },
                    { speaker: 'A', text: "Yet there's still value in the tactile shopping experience." },
                    { speaker: 'B', text: "Particularly for items where fit and fabric matter." }
                ]
            ],
            closings: [
                [
                    { speaker: 'A', text: "This expedition has been remarkably fruitful." },
                    { speaker: 'B', text: "I've acquired precisely what I was seeking." },
                    { speaker: 'A', text: "Thoughtful consumption is truly satisfying." },
                    { speaker: 'B', text: "Indeed. Quality purchases bring lasting contentment." }
                ]
            ]
        }
    },
    travel: {
        easy: {
            openings: [
                [
                    { speaker: 'A', text: "I'm so excited about our trip next week!" },
                    { speaker: 'B', text: "Me too! Have you started packing yet?" },
                    { speaker: 'A', text: "A little bit. I'm not sure what to bring." },
                    { speaker: 'B', text: "Check the weather forecast first. That helps a lot." }
                ],
                [
                    { speaker: 'A', text: "Have you ever been to the beach?" },
                    { speaker: 'B', text: "Yes! I love the beach. The ocean is so relaxing." },
                    { speaker: 'A', text: "I want to go somewhere warm for my next vacation." },
                    { speaker: 'B', text: "You should! There's nothing like lying in the sun." }
                ]
            ],
            discussions: [
                [
                    { speaker: 'A', text: "Did you book the hotel yet?" },
                    { speaker: 'B', text: "Yes, I found a great one near the city center." },
                    { speaker: 'A', text: "Perfect! That will make sightseeing easier." },
                    { speaker: 'B', text: "And there are lots of restaurants nearby." }
                ],
                [
                    { speaker: 'A', text: "I love trying local food when I travel." },
                    { speaker: 'B', text: "Same! It's the best way to experience a culture." },
                    { speaker: 'A', text: "Do you know any good places to eat there?" },
                    { speaker: 'B', text: "I found some recommendations online. I'll share them with you." }
                ],
                [
                    { speaker: 'A', text: "Should we rent a car or use public transport?" },
                    { speaker: 'B', text: "Public transport is pretty good there, I heard." },
                    { speaker: 'A', text: "That would save us money and parking hassles." },
                    { speaker: 'B', text: "Plus it's more environmentally friendly!" }
                ],
                [
                    { speaker: 'A', text: "What tourist spots do you want to visit?" },
                    { speaker: 'B', text: "The main square and the old castle look interesting." },
                    { speaker: 'A', text: "I'd also like to check out the local market." },
                    { speaker: 'B', text: "Great idea! We can buy some souvenirs there." }
                ]
            ],
            closings: [
                [
                    { speaker: 'A', text: "I can't wait for this trip. It's going to be amazing!" },
                    { speaker: 'B', text: "Only five more days! The countdown is on." },
                    { speaker: 'A', text: "Don't forget your passport!" },
                    { speaker: 'B', text: "Already got it ready! See you at the airport!" }
                ]
            ]
        },
        medium: {
            openings: [
                [
                    { speaker: 'A', text: "I've been researching destinations for our summer vacation." },
                    { speaker: 'B', text: "Have you found anything promising?" },
                    { speaker: 'A', text: "There are several options, each with different advantages." },
                    { speaker: 'B', text: "What factors are you considering in your decision?" }
                ]
            ],
            discussions: [
                [
                    { speaker: 'A', text: "Traveling during the off-season has its benefits." },
                    { speaker: 'B', text: "Fewer crowds and lower prices, for starters." },
                    { speaker: 'A', text: "The weather might be less predictable though." },
                    { speaker: 'B', text: "True, but it's often worth the trade-off." }
                ],
                [
                    { speaker: 'A', text: "I prefer boutique hotels to large chain hotels." },
                    { speaker: 'B', text: "They tend to have more character and personal service." },
                    { speaker: 'A', text: "Exactly. It makes the stay more memorable." },
                    { speaker: 'B', text: "And they often reflect the local culture better." }
                ]
            ],
            closings: [
                [
                    { speaker: 'A', text: "I think we've planned a well-balanced itinerary." },
                    { speaker: 'B', text: "A good mix of activities and relaxation time." },
                    { speaker: 'A', text: "That's the key to an enjoyable trip." },
                    { speaker: 'B', text: "I'm looking forward to it immensely." }
                ]
            ]
        },
        hard: {
            openings: [
                [
                    { speaker: 'A', text: "International travel has become increasingly accessible." },
                    { speaker: 'B', text: "Though it requires considerable logistical planning." },
                    { speaker: 'A', text: "The cultural immersion makes it worthwhile, I find." },
                    { speaker: 'B', text: "Experiencing different perspectives broadens one's worldview." }
                ]
            ],
            discussions: [
                [
                    { speaker: 'A', text: "Sustainable tourism is becoming a significant consideration." },
                    { speaker: 'B', text: "Travelers are more conscious of their environmental impact." },
                    { speaker: 'A', text: "It's encouraging to see eco-friendly options expanding." },
                    { speaker: 'B', text: "Responsible travel benefits both visitors and local communities." }
                ]
            ],
            closings: [
                [
                    { speaker: 'A', text: "This journey has been thoroughly transformative." },
                    { speaker: 'B', text: "Travel invariably provides valuable perspective." },
                    { speaker: 'A', text: "I shall treasure these experiences indefinitely." },
                    { speaker: 'B', text: "Until our next adventure then." }
                ]
            ]
        }
    },
    health: {
        easy: {
            openings: [
                [
                    { speaker: 'A', text: "I've been trying to eat healthier lately." },
                    { speaker: 'B', text: "That's great! What changes have you made?" },
                    { speaker: 'A', text: "More vegetables and less junk food." },
                    { speaker: 'B', text: "Good start! I should do the same." }
                ],
                [
                    { speaker: 'A', text: "I started going to the gym this month." },
                    { speaker: 'B', text: "How's it going? Do you like it?" },
                    { speaker: 'A', text: "It's hard, but I feel more energetic already." },
                    { speaker: 'B', text: "Keep it up! It gets easier with time." }
                ]
            ],
            discussions: [
                [
                    { speaker: 'A', text: "I need to drink more water every day." },
                    { speaker: 'B', text: "Me too! I always forget during work." },
                    { speaker: 'A', text: "Maybe set reminders on your phone?" },
                    { speaker: 'B', text: "Good idea! I'll try that." }
                ],
                [
                    { speaker: 'A', text: "I haven't been sleeping well lately." },
                    { speaker: 'B', text: "That's not good. Are you stressed about something?" },
                    { speaker: 'A', text: "Maybe a little. Work has been busy." },
                    { speaker: 'B', text: "Try to relax before bed. No screens, maybe some tea." }
                ],
                [
                    { speaker: 'A', text: "Do you take any vitamins?" },
                    { speaker: 'B', text: "Just vitamin D. It helps in the winter months." },
                    { speaker: 'A', text: "I've heard that's important. Maybe I should start." },
                    { speaker: 'B', text: "Talk to your doctor first to see what you need." }
                ],
                [
                    { speaker: 'A', text: "Walking is such good exercise, and it's free!" },
                    { speaker: 'B', text: "I try to walk at least thirty minutes every day." },
                    { speaker: 'A', text: "That's impressive! I should join you sometime." },
                    { speaker: 'B', text: "That would be fun! Exercise is better with company." }
                ]
            ],
            closings: [
                [
                    { speaker: 'A', text: "Thanks for the healthy tips!" },
                    { speaker: 'B', text: "Anytime! We can motivate each other." },
                    { speaker: 'A', text: "That's a good idea. Health buddies!" },
                    { speaker: 'B', text: "Exactly! Let's check in next week." }
                ]
            ]
        },
        medium: {
            openings: [
                [
                    { speaker: 'A', text: "I've been focusing more on my mental health recently." },
                    { speaker: 'B', text: "That's so important and often overlooked." },
                    { speaker: 'A', text: "I started meditation and it's really helping." },
                    { speaker: 'B', text: "I've heard great things about mindfulness practices." }
                ]
            ],
            discussions: [
                [
                    { speaker: 'A', text: "Finding the right work-life balance is challenging." },
                    { speaker: 'B', text: "Especially with remote work blurring the boundaries." },
                    { speaker: 'A', text: "Setting strict work hours has helped me." },
                    { speaker: 'B', text: "That's a good strategy. Boundaries are essential." }
                ],
                [
                    { speaker: 'A', text: "Regular health checkups are worth the time investment." },
                    { speaker: 'B', text: "Prevention is always better than treatment." },
                    { speaker: 'A', text: "I schedule mine at the same time every year." },
                    { speaker: 'B', text: "That's a smart routine to maintain." }
                ]
            ],
            closings: [
                [
                    { speaker: 'A', text: "This conversation has been really motivating." },
                    { speaker: 'B', text: "It's good to discuss these topics openly." },
                    { speaker: 'A', text: "Let's keep each other accountable." },
                    { speaker: 'B', text: "Absolutely. Health is our most valuable asset." }
                ]
            ]
        },
        hard: {
            openings: [
                [
                    { speaker: 'A', text: "The healthcare landscape is evolving significantly." },
                    { speaker: 'B', text: "Technological advances are transforming patient care." },
                    { speaker: 'A', text: "Telemedicine has made healthcare more accessible." },
                    { speaker: 'B', text: "Though it cannot entirely replace in-person consultations." }
                ]
            ],
            discussions: [
                [
                    { speaker: 'A', text: "Preventive medicine should be prioritized over reactive treatment." },
                    { speaker: 'B', text: "The healthcare system is gradually shifting that direction." },
                    { speaker: 'A', text: "Education plays a crucial role in this transformation." },
                    { speaker: 'B', text: "An informed populace makes better health decisions." }
                ]
            ],
            closings: [
                [
                    { speaker: 'A', text: "This discourse has been intellectually stimulating." },
                    { speaker: 'B', text: "Healthcare is a topic worthy of thoughtful consideration." },
                    { speaker: 'A', text: "We must remain proactive about our wellbeing." },
                    { speaker: 'B', text: "Indeed. Good health underpins everything else." }
                ]
            ]
        }
    }
};

// Additional topics with basic dialogues
const AdditionalDialogues = {
    meeting: {
        easy: {
            openings: [
                [
                    { speaker: 'A', text: "Thanks everyone for joining the meeting." },
                    { speaker: 'B', text: "Happy to be here. What's on the agenda today?" },
                    { speaker: 'A', text: "We need to discuss the upcoming project deadlines." },
                    { speaker: 'B', text: "Good. I have some updates to share as well." }
                ]
            ],
            discussions: [
                [
                    { speaker: 'A', text: "Let's start with the project status update." },
                    { speaker: 'B', text: "We're on track to finish by next Friday." },
                    { speaker: 'A', text: "That's great news! Any challenges we should know about?" },
                    { speaker: 'B', text: "Just some minor issues, but nothing we can't handle." }
                ],
                [
                    { speaker: 'A', text: "Does anyone have questions about the new process?" },
                    { speaker: 'B', text: "Yes, I was wondering about the approval workflow." },
                    { speaker: 'A', text: "Good question. Let me explain how it works." },
                    { speaker: 'B', text: "Thanks, that would be very helpful." }
                ]
            ],
            closings: [
                [
                    { speaker: 'A', text: "I think we covered everything. Any final thoughts?" },
                    { speaker: 'B', text: "I'm good. This was a productive meeting." },
                    { speaker: 'A', text: "Great! Let's meet again next week." },
                    { speaker: 'B', text: "Sounds good. Thanks everyone!" }
                ]
            ]
        },
        medium: {
            openings: [
                [
                    { speaker: 'A', text: "Let's begin by reviewing the action items from last week." },
                    { speaker: 'B', text: "I've completed most of mine. Just waiting on some feedback." },
                    { speaker: 'A', text: "Good progress. We'll address the pending items today." },
                    { speaker: 'B', text: "Perfect. I've prepared some materials to share." }
                ]
            ],
            discussions: [
                [
                    { speaker: 'A', text: "We need to align on our quarterly objectives." },
                    { speaker: 'B', text: "I've drafted some proposals based on our discussion." },
                    { speaker: 'A', text: "Excellent. Let's review them together." },
                    { speaker: 'B', text: "I'll share my screen so everyone can see." }
                ]
            ],
            closings: [
                [
                    { speaker: 'A', text: "Let me summarize the key decisions we made." },
                    { speaker: 'B', text: "I'll send out the meeting notes by end of day." },
                    { speaker: 'A', text: "Perfect. Thank you all for your contributions." },
                    { speaker: 'B', text: "Looking forward to seeing the progress next week." }
                ]
            ]
        },
        hard: {
            openings: [
                [
                    { speaker: 'A', text: "Today's discussion requires strategic alignment across departments." },
                    { speaker: 'B', text: "I've prepared a comprehensive analysis for consideration." },
                    { speaker: 'A', text: "Excellent. Stakeholder input will be crucial here." },
                    { speaker: 'B', text: "Agreed. Let's ensure all perspectives are represented." }
                ]
            ],
            discussions: [
                [
                    { speaker: 'A', text: "The implementation timeline requires careful consideration." },
                    { speaker: 'B', text: "We must balance expediency with thoroughness." },
                    { speaker: 'A', text: "Perhaps a phased approach would mitigate potential risks." },
                    { speaker: 'B', text: "That methodology has proven effective in similar initiatives." }
                ]
            ],
            closings: [
                [
                    { speaker: 'A', text: "I believe we've established a solid framework moving forward." },
                    { speaker: 'B', text: "The collaborative approach has yielded productive outcomes." },
                    { speaker: 'A', text: "I shall circulate the strategic recommendations." },
                    { speaker: 'B', text: "We reconvene once stakeholder feedback is consolidated." }
                ]
            ]
        }
    },
    technology: {
        easy: {
            openings: [
                [
                    { speaker: 'A', text: "Did you see the new phone that came out?" },
                    { speaker: 'B', text: "Yes! The camera looks amazing." },
                    { speaker: 'A', text: "I'm thinking about getting one." },
                    { speaker: 'B', text: "Me too, but it's a bit expensive." }
                ]
            ],
            discussions: [
                [
                    { speaker: 'A', text: "My laptop is getting so slow." },
                    { speaker: 'B', text: "How old is it?" },
                    { speaker: 'A', text: "About five years. Maybe time for a new one." },
                    { speaker: 'B', text: "They have some good deals right now." }
                ],
                [
                    { speaker: 'A', text: "Do you use any apps for productivity?" },
                    { speaker: 'B', text: "Yes! I love using a calendar app for everything." },
                    { speaker: 'A', text: "Which one do you recommend?" },
                    { speaker: 'B', text: "I'll send you the link. It's free!" }
                ]
            ],
            closings: [
                [
                    { speaker: 'A', text: "Technology makes life so much easier." },
                    { speaker: 'B', text: "When it works! But yes, I agree." },
                    { speaker: 'A', text: "Let me know if you get that new phone!" },
                    { speaker: 'B', text: "I will! We can compare features." }
                ]
            ]
        },
        medium: {
            openings: [
                [
                    { speaker: 'A', text: "Have you been following the developments in AI?" },
                    { speaker: 'B', text: "It's fascinating how quickly things are advancing." },
                    { speaker: 'A', text: "The applications seem endless at this point." },
                    { speaker: 'B', text: "Though it raises some important questions too." }
                ]
            ],
            discussions: [
                [
                    { speaker: 'A', text: "Cloud storage has changed how we work entirely." },
                    { speaker: 'B', text: "The convenience of accessing files anywhere is invaluable." },
                    { speaker: 'A', text: "Security remains a concern for some people." },
                    { speaker: 'B', text: "That's true. Choosing reputable providers is essential." }
                ]
            ],
            closings: [
                [
                    { speaker: 'A', text: "It's hard to keep up with all the new developments." },
                    { speaker: 'B', text: "Technology evolves so rapidly these days." },
                    { speaker: 'A', text: "At least we can adapt gradually." },
                    { speaker: 'B', text: "That's the healthy approach to take." }
                ]
            ]
        },
        hard: {
            openings: [
                [
                    { speaker: 'A', text: "The convergence of technologies is creating unprecedented opportunities." },
                    { speaker: 'B', text: "The intersection of AI and biotechnology is particularly intriguing." },
                    { speaker: 'A', text: "Though we must consider the ethical implications carefully." },
                    { speaker: 'B', text: "Governance frameworks are struggling to keep pace." }
                ]
            ],
            discussions: [
                [
                    { speaker: 'A', text: "Digital transformation requires comprehensive organizational change." },
                    { speaker: 'B', text: "Technology alone is insufficient without cultural adaptation." },
                    { speaker: 'A', text: "The human element remains paramount in implementation." },
                    { speaker: 'B', text: "Change management is often the most challenging aspect." }
                ]
            ],
            closings: [
                [
                    { speaker: 'A', text: "These technological paradigm shifts will reshape industries." },
                    { speaker: 'B', text: "Adaptation and continuous learning become essential skills." },
                    { speaker: 'A', text: "Those who embrace change will thrive." },
                    { speaker: 'B', text: "A prescient observation for our times." }
                ]
            ]
        }
    }
};

// Merge additional dialogues into main database
Object.assign(DialogueDatabase, AdditionalDialogues);
