/**
 * Vocabulary Bot - Enhanced Conversation Generator
 * Version 2.0 - With natural conversation flow and advanced speech controls
 */

(function() {
    'use strict';

    // =============================================
    // Vocabulary Database (Condensed for brevity)
    // =============================================

    const vocabularyDatabase = {
        office: {
            easy: {
                nouns: {
                    desk: { definition: "A table used for work or study", phonetic: "/desk/", frequency: "common", synonyms: ["table", "workstation"], antonyms: [], examples: ["I left my phone on my desk.", "She has a corner desk."] },
                    chair: { definition: "A seat for one person with a back", phonetic: "/tʃeər/", frequency: "common", synonyms: ["seat"], antonyms: [], examples: ["Please take a chair.", "The office chair is comfortable."] },
                    computer: { definition: "An electronic device for storing and processing data", phonetic: "/kəmˈpjuːtər/", frequency: "common", synonyms: ["PC", "machine"], antonyms: [], examples: ["My computer crashed.", "She works on her computer all day."] },
                    phone: { definition: "A device used to make calls", phonetic: "/fəʊn/", frequency: "common", synonyms: ["telephone", "mobile"], antonyms: [], examples: ["The phone is ringing.", "I'll call you on your phone."] },
                    email: { definition: "Electronic messages sent via the internet", phonetic: "/ˈiːmeɪl/", frequency: "common", synonyms: ["message", "mail"], antonyms: [], examples: ["I sent you an email.", "Check your email inbox."] },
                    boss: { definition: "A person in charge of workers", phonetic: "/bɒs/", frequency: "common", synonyms: ["manager", "supervisor"], antonyms: ["employee"], examples: ["My boss approved my vacation.", "The boss called a meeting."] },
                    meeting: { definition: "A gathering of people for discussion", phonetic: "/ˈmiːtɪŋ/", frequency: "common", synonyms: ["conference"], antonyms: [], examples: ["We have a meeting at 3 PM.", "The meeting was productive."] },
                    team: { definition: "A group working together", phonetic: "/tiːm/", frequency: "common", synonyms: ["group", "crew"], antonyms: [], examples: ["Our team won the project.", "She's part of the sales team."] },
                    break: { definition: "A pause from work", phonetic: "/breɪk/", frequency: "common", synonyms: ["rest", "pause"], antonyms: [], examples: ["Let's take a break.", "Break time is at noon."] },
                    coffee: { definition: "A hot drink made from roasted beans", phonetic: "/ˈkɒfi/", frequency: "common", synonyms: ["java"], antonyms: [], examples: ["I need my morning coffee.", "Want to grab a coffee?"] }
                },
                verbs: {
                    work: { definition: "To do tasks as a job", phonetic: "/wɜːk/", frequency: "common", synonyms: ["labor"], antonyms: ["rest"], examples: ["I work from home.", "She works hard."] },
                    send: { definition: "To cause to go to a destination", phonetic: "/send/", frequency: "common", synonyms: ["deliver"], antonyms: ["receive"], examples: ["Send me the file.", "I'll send an email."] },
                    call: { definition: "To contact by phone", phonetic: "/kɔːl/", frequency: "common", synonyms: ["phone"], antonyms: [], examples: ["Call me later.", "I need to call my client."] },
                    meet: { definition: "To come together", phonetic: "/miːt/", frequency: "common", synonyms: ["gather"], antonyms: [], examples: ["Let's meet tomorrow.", "We meet every Monday."] },
                    help: { definition: "To assist someone", phonetic: "/help/", frequency: "common", synonyms: ["assist"], antonyms: [], examples: ["Can you help me?", "I'm happy to help."] },
                    finish: { definition: "To complete something", phonetic: "/ˈfɪnɪʃ/", frequency: "common", synonyms: ["complete"], antonyms: ["start"], examples: ["Finish your work.", "I finished the report."] },
                    check: { definition: "To examine or verify", phonetic: "/tʃek/", frequency: "common", synonyms: ["examine"], antonyms: [], examples: ["Check your email.", "I need to check the schedule."] }
                },
                adjectives: {
                    busy: { definition: "Having a lot to do", phonetic: "/ˈbɪzi/", frequency: "common", synonyms: ["occupied"], antonyms: ["free"], examples: ["I'm very busy today.", "It's a busy office."] },
                    late: { definition: "After the expected time", phonetic: "/leɪt/", frequency: "common", synonyms: ["delayed"], antonyms: ["early"], examples: ["Sorry I'm late.", "The meeting started late."] },
                    tired: { definition: "In need of rest", phonetic: "/taɪəd/", frequency: "common", synonyms: ["exhausted"], antonyms: ["energetic"], examples: ["I'm so tired.", "Long meetings make me tired."] },
                    new: { definition: "Recently made", phonetic: "/njuː/", frequency: "common", synonyms: ["fresh"], antonyms: ["old"], examples: ["We have a new employee.", "This is a new computer."] },
                    good: { definition: "Of high quality", phonetic: "/ɡʊd/", frequency: "common", synonyms: ["great"], antonyms: ["bad"], examples: ["Good job!", "That's a good idea."] }
                },
                adverbs: {
                    quickly: { definition: "At a fast speed", phonetic: "/ˈkwɪkli/", frequency: "common", synonyms: ["fast"], antonyms: ["slowly"], examples: ["Please respond quickly.", "She types quickly."] },
                    always: { definition: "At all times", phonetic: "/ˈɔːlweɪz/", frequency: "common", synonyms: ["constantly"], antonyms: ["never"], examples: ["I always check my email.", "She's always on time."] },
                    today: { definition: "On this present day", phonetic: "/təˈdeɪ/", frequency: "common", synonyms: ["now"], antonyms: [], examples: ["I'm busy today.", "Today is Monday."] },
                    well: { definition: "In a good manner", phonetic: "/wel/", frequency: "common", synonyms: ["nicely"], antonyms: ["poorly"], examples: ["You did well.", "The project went well."] }
                },
                idioms: {
                    "back to the drawing board": { definition: "To start over because a plan failed", frequency: "common", examples: ["The proposal was rejected, so it's back to the drawing board."] },
                    "get the ball rolling": { definition: "To start an activity", frequency: "common", examples: ["Let's get the ball rolling on this project."] },
                    "on the same page": { definition: "To have the same understanding", frequency: "common", examples: ["Let's make sure we're on the same page."] }
                },
                collocations: {
                    "send an email": { definition: "To transmit an electronic message", frequency: "common", examples: ["I need to send an email to the client."] },
                    "take a break": { definition: "To pause from work for rest", frequency: "common", examples: ["Let's take a break for 15 minutes."] },
                    "have a meeting": { definition: "To conduct a formal discussion", frequency: "common", examples: ["We have a meeting at 2 PM."] }
                }
            },
            medium: {
                nouns: {
                    deadline: { definition: "The latest time by which something must be completed", phonetic: "/ˈdedlaɪn/", frequency: "common", synonyms: ["due date"], antonyms: [], examples: ["The deadline is Friday.", "We need to meet the deadline."] },
                    project: { definition: "A planned piece of work", phonetic: "/ˈprɒdʒekt/", frequency: "common", synonyms: ["task"], antonyms: [], examples: ["I'm working on a new project.", "The project is on schedule."] },
                    colleague: { definition: "A person you work with", phonetic: "/ˈkɒliːɡ/", frequency: "common", synonyms: ["coworker"], antonyms: [], examples: ["My colleague helped me.", "She's a valued colleague."] },
                    schedule: { definition: "A plan of activities", phonetic: "/ˈʃedjuːl/", frequency: "common", synonyms: ["timetable"], antonyms: [], examples: ["Check the schedule.", "My schedule is full."] },
                    workload: { definition: "The amount of work to be done", phonetic: "/ˈwɜːkləʊd/", frequency: "intermediate", synonyms: ["burden"], antonyms: [], examples: ["My workload is heavy.", "We need to balance the workload."] }
                },
                verbs: {
                    submit: { definition: "To present for approval", phonetic: "/səbˈmɪt/", frequency: "common", synonyms: ["present"], antonyms: [], examples: ["Submit your report.", "I submitted my application."] },
                    collaborate: { definition: "To work together", phonetic: "/kəˈlæbəreɪt/", frequency: "intermediate", synonyms: ["cooperate"], antonyms: [], examples: ["Let's collaborate on this.", "Teams collaborate effectively."] },
                    prioritize: { definition: "To determine order of importance", phonetic: "/praɪˈɒrɪtaɪz/", frequency: "intermediate", synonyms: ["rank"], antonyms: [], examples: ["Prioritize your tasks.", "We need to prioritize this issue."] },
                    review: { definition: "To examine something", phonetic: "/rɪˈvjuː/", frequency: "common", synonyms: ["examine"], antonyms: [], examples: ["Review the document.", "I'll review your proposal."] }
                },
                adjectives: {
                    productive: { definition: "Achieving a lot", phonetic: "/prəˈdʌktɪv/", frequency: "common", synonyms: ["efficient"], antonyms: ["unproductive"], examples: ["It was a productive meeting.", "Be more productive."] },
                    urgent: { definition: "Requiring immediate attention", phonetic: "/ˈɜːdʒənt/", frequency: "common", synonyms: ["pressing"], antonyms: [], examples: ["This is urgent.", "Handle urgent matters first."] },
                    challenging: { definition: "Demanding effort", phonetic: "/ˈtʃælɪndʒɪŋ/", frequency: "intermediate", synonyms: ["difficult"], antonyms: ["easy"], examples: ["It's a challenging project.", "I enjoy challenging work."] }
                },
                adverbs: {
                    efficiently: { definition: "In a way that achieves maximum productivity", phonetic: "/ɪˈfɪʃntli/", frequency: "common", synonyms: ["effectively"], antonyms: [], examples: ["Work efficiently.", "She manages time efficiently."] },
                    immediately: { definition: "At once; without delay", phonetic: "/ɪˈmiːdiətli/", frequency: "common", synonyms: ["instantly"], antonyms: ["later"], examples: ["Respond immediately.", "I'll do it immediately."] },
                    currently: { definition: "At the present time", phonetic: "/ˈkʌrəntli/", frequency: "common", synonyms: ["now"], antonyms: [], examples: ["I'm currently working on it.", "Currently available."] }
                },
                idioms: {
                    "think outside the box": { definition: "To think creatively", frequency: "common", examples: ["We need to think outside the box for this problem."] },
                    "hit the ground running": { definition: "To start with immediate effectiveness", frequency: "common", examples: ["The new hire hit the ground running."] },
                    "keep someone in the loop": { definition: "To keep someone informed", frequency: "common", examples: ["Please keep me in the loop on this project."] }
                },
                collocations: {
                    "meet a deadline": { definition: "To complete work by the required time", frequency: "common", examples: ["We must meet the deadline."] },
                    "make progress": { definition: "To advance toward a goal", frequency: "common", examples: ["We're making good progress."] }
                }
            },
            hard: {
                nouns: {
                    stakeholder: { definition: "A person with interest in a business decision", phonetic: "/ˈsteɪkhəʊldər/", frequency: "intermediate", synonyms: ["investor"], antonyms: [], examples: ["Consult all stakeholders.", "Key stakeholders must approve."] },
                    implementation: { definition: "The process of putting a plan into effect", phonetic: "/ˌɪmplɪmenˈteɪʃn/", frequency: "intermediate", synonyms: ["execution"], antonyms: [], examples: ["Implementation begins Monday.", "Successful implementation is key."] },
                    synergy: { definition: "Combined effort producing greater results", phonetic: "/ˈsɪnədʒi/", frequency: "rare", synonyms: ["collaboration"], antonyms: [], examples: ["Create synergy between teams.", "Synergy drives innovation."] }
                },
                verbs: {
                    streamline: { definition: "To make a process more efficient", phonetic: "/ˈstriːmlaɪn/", frequency: "intermediate", synonyms: ["simplify"], antonyms: ["complicate"], examples: ["Streamline the workflow.", "We streamlined operations."] },
                    leverage: { definition: "To use something to maximum advantage", phonetic: "/ˈliːvərɪdʒ/", frequency: "intermediate", synonyms: ["utilize"], antonyms: [], examples: ["Leverage our expertise.", "Leverage existing resources."] },
                    facilitate: { definition: "To make an action easier", phonetic: "/fəˈsɪlɪteɪt/", frequency: "intermediate", synonyms: ["enable"], antonyms: ["hinder"], examples: ["Facilitate the discussion.", "Technology facilitates communication."] }
                },
                adjectives: {
                    comprehensive: { definition: "Including all elements", phonetic: "/ˌkɒmprɪˈhensɪv/", frequency: "common", synonyms: ["complete"], antonyms: ["incomplete"], examples: ["A comprehensive report.", "Comprehensive analysis."] },
                    strategic: { definition: "Relating to long-term plans", phonetic: "/strəˈtiːdʒɪk/", frequency: "common", synonyms: ["tactical"], antonyms: [], examples: ["Strategic planning.", "A strategic decision."] },
                    meticulous: { definition: "Very careful and precise", phonetic: "/mɪˈtɪkjələs/", frequency: "intermediate", synonyms: ["thorough"], antonyms: ["careless"], examples: ["Meticulous attention to detail.", "She's meticulous."] }
                },
                adverbs: {
                    strategically: { definition: "In a way relating to strategy", phonetic: "/strəˈtiːdʒɪkli/", frequency: "intermediate", synonyms: ["tactically"], antonyms: [], examples: ["Plan strategically.", "Strategically positioned."] },
                    subsequently: { definition: "After a particular thing has happened", phonetic: "/ˈsʌbsɪkwəntli/", frequency: "intermediate", synonyms: ["afterwards"], antonyms: ["previously"], examples: ["Subsequently approved.", "It was subsequently changed."] }
                },
                idioms: {
                    "move the needle": { definition: "To make a noticeable difference", frequency: "intermediate", examples: ["This strategy will move the needle on sales."] },
                    "low-hanging fruit": { definition: "Easy tasks that can be quickly achieved", frequency: "common", examples: ["Let's focus on the low-hanging fruit first."] },
                    "deep dive": { definition: "A thorough examination", frequency: "intermediate", examples: ["We need to do a deep dive into the data."] }
                },
                collocations: {
                    "drive results": { definition: "To produce outcomes through effort", frequency: "intermediate", examples: ["This initiative will drive results."] },
                    "mitigate risk": { definition: "To reduce potential negative outcomes", frequency: "intermediate", examples: ["We must mitigate the risk."] }
                }
            }
        },
        home: {
            easy: {
                nouns: {
                    house: { definition: "A building for people to live in", phonetic: "/haʊs/", frequency: "common", synonyms: ["home"], antonyms: [], examples: ["I live in a house.", "The house is big."] },
                    room: { definition: "A space enclosed by walls", phonetic: "/ruːm/", frequency: "common", synonyms: ["chamber"], antonyms: [], examples: ["My room is clean.", "Go to your room."] },
                    kitchen: { definition: "A room where food is prepared", phonetic: "/ˈkɪtʃɪn/", frequency: "common", synonyms: [], antonyms: [], examples: ["Cook in the kitchen.", "The kitchen smells good."] },
                    family: { definition: "A group of related people", phonetic: "/ˈfæməli/", frequency: "common", synonyms: ["relatives"], antonyms: [], examples: ["I love my family.", "Family dinner tonight."] },
                    garden: { definition: "An area for growing plants", phonetic: "/ˈɡɑːdn/", frequency: "common", synonyms: ["yard"], antonyms: [], examples: ["Water the garden.", "The garden is beautiful."] }
                },
                verbs: {
                    cook: { definition: "To prepare food by heating", phonetic: "/kʊk/", frequency: "common", synonyms: ["prepare"], antonyms: [], examples: ["I cook dinner.", "She cooks well."] },
                    clean: { definition: "To remove dirt", phonetic: "/kliːn/", frequency: "common", synonyms: ["wash"], antonyms: [], examples: ["Clean your room.", "I clean every week."] },
                    sleep: { definition: "To rest with eyes closed", phonetic: "/sliːp/", frequency: "common", synonyms: ["rest"], antonyms: ["wake"], examples: ["I need to sleep.", "Sleep well."] },
                    eat: { definition: "To consume food", phonetic: "/iːt/", frequency: "common", synonyms: ["dine"], antonyms: [], examples: ["Let's eat.", "Eat your vegetables."] },
                    relax: { definition: "To rest and become calm", phonetic: "/rɪˈlæks/", frequency: "common", synonyms: ["unwind"], antonyms: ["stress"], examples: ["I like to relax at home.", "Relax and enjoy."] }
                },
                adjectives: {
                    clean: { definition: "Free from dirt", phonetic: "/kliːn/", frequency: "common", synonyms: ["tidy"], antonyms: ["dirty"], examples: ["The house is clean.", "Keep it clean."] },
                    cozy: { definition: "Comfortable and warm", phonetic: "/ˈkəʊzi/", frequency: "common", synonyms: ["comfortable"], antonyms: [], examples: ["A cozy home.", "So cozy here."] },
                    quiet: { definition: "Making little noise", phonetic: "/ˈkwaɪət/", frequency: "common", synonyms: ["silent"], antonyms: ["noisy"], examples: ["A quiet evening.", "Be quiet please."] },
                    warm: { definition: "Moderately hot", phonetic: "/wɔːm/", frequency: "common", synonyms: ["heated"], antonyms: ["cold"], examples: ["The house is warm.", "Warm and cozy."] }
                },
                adverbs: {
                    quietly: { definition: "With little sound", phonetic: "/ˈkwaɪətli/", frequency: "common", synonyms: ["silently"], antonyms: ["loudly"], examples: ["Speak quietly.", "Close the door quietly."] },
                    happily: { definition: "In a happy manner", phonetic: "/ˈhæpɪli/", frequency: "common", synonyms: ["joyfully"], antonyms: ["sadly"], examples: ["They lived happily.", "Happily married."] },
                    together: { definition: "With each other", phonetic: "/təˈɡeðər/", frequency: "common", synonyms: ["jointly"], antonyms: ["separately"], examples: ["Let's eat together.", "Work together."] }
                },
                idioms: {
                    "home sweet home": { definition: "Expression of pleasure at being home", frequency: "common", examples: ["After vacation, home sweet home!"] },
                    "make yourself at home": { definition: "Feel comfortable as in your own home", frequency: "common", examples: ["Please, make yourself at home."] }
                },
                collocations: {
                    "do the dishes": { definition: "To wash the plates", frequency: "common", examples: ["I'll do the dishes after dinner."] },
                    "make the bed": { definition: "To arrange bedding neatly", frequency: "common", examples: ["Make your bed every morning."] }
                }
            },
            medium: {
                nouns: {
                    household: { definition: "A house and its occupants", phonetic: "/ˈhaʊshəʊld/", frequency: "common", synonyms: ["family"], antonyms: [], examples: ["The whole household.", "Household items."] },
                    furniture: { definition: "Movable objects in a room", phonetic: "/ˈfɜːnɪtʃər/", frequency: "common", synonyms: ["furnishings"], antonyms: [], examples: ["New furniture.", "Office furniture."] },
                    neighborhood: { definition: "A district or area", phonetic: "/ˈneɪbəhʊd/", frequency: "common", synonyms: ["area"], antonyms: [], examples: ["Nice neighborhood.", "In the neighborhood."] }
                },
                verbs: {
                    renovate: { definition: "To restore to good condition", phonetic: "/ˈrenəveɪt/", frequency: "intermediate", synonyms: ["restore"], antonyms: [], examples: ["Renovate the kitchen.", "We renovated last year."] },
                    decorate: { definition: "To make more attractive", phonetic: "/ˈdekəreɪt/", frequency: "common", synonyms: ["adorn"], antonyms: [], examples: ["Decorate the room.", "Decorating for the holidays."] },
                    organize: { definition: "To arrange systematically", phonetic: "/ˈɔːɡənaɪz/", frequency: "common", synonyms: ["arrange"], antonyms: [], examples: ["Organize the closet.", "Get organized."] }
                },
                adjectives: {
                    spacious: { definition: "Having ample space", phonetic: "/ˈspeɪʃəs/", frequency: "common", synonyms: ["roomy"], antonyms: ["cramped"], examples: ["A spacious apartment.", "Spacious rooms."] },
                    comfortable: { definition: "Providing physical ease", phonetic: "/ˈkʌmftəbl/", frequency: "common", synonyms: ["cozy"], antonyms: ["uncomfortable"], examples: ["Comfortable sofa.", "Very comfortable."] },
                    modern: { definition: "Relating to present times", phonetic: "/ˈmɒdn/", frequency: "common", synonyms: ["contemporary"], antonyms: ["old-fashioned"], examples: ["Modern design.", "A modern home."] }
                },
                adverbs: {
                    comfortably: { definition: "In a comfortable manner", phonetic: "/ˈkʌmftəbli/", frequency: "common", synonyms: ["cozily"], antonyms: [], examples: ["Live comfortably.", "Sitting comfortably."] },
                    regularly: { definition: "At fixed intervals", phonetic: "/ˈreɡjələli/", frequency: "common", synonyms: ["routinely"], antonyms: [], examples: ["Clean regularly.", "Maintained regularly."] }
                },
                idioms: {
                    "a roof over your head": { definition: "A place to live", frequency: "common", examples: ["At least we have a roof over our heads."] }
                },
                collocations: {
                    "do housework": { definition: "To perform household tasks", frequency: "common", examples: ["I do housework on weekends."] },
                    "run errands": { definition: "To do short tasks outside home", frequency: "common", examples: ["I need to run some errands."] }
                }
            },
            hard: {
                nouns: {
                    amenities: { definition: "Desirable features of a place", phonetic: "/əˈmiːnɪtiz/", frequency: "intermediate", synonyms: ["facilities"], antonyms: [], examples: ["Modern amenities.", "All amenities included."] },
                    sustainability: { definition: "Ability to be maintained long-term", phonetic: "/səˌsteɪnəˈbɪləti/", frequency: "intermediate", synonyms: [], antonyms: [], examples: ["Focus on sustainability.", "Environmental sustainability."] }
                },
                verbs: {
                    refurbish: { definition: "To renovate and redecorate", phonetic: "/ˌriːˈfɜːbɪʃ/", frequency: "intermediate", synonyms: ["renovate"], antonyms: [], examples: ["Refurbish the apartment.", "Completely refurbished."] },
                    optimize: { definition: "To make the best use of", phonetic: "/ˈɒptɪmaɪz/", frequency: "intermediate", synonyms: ["maximize"], antonyms: [], examples: ["Optimize the space.", "Optimize energy use."] }
                },
                adjectives: {
                    immaculate: { definition: "Perfectly clean", phonetic: "/ɪˈmækjələt/", frequency: "intermediate", synonyms: ["spotless"], antonyms: ["dirty"], examples: ["Immaculate condition.", "An immaculate home."] },
                    sustainable: { definition: "Able to be maintained", phonetic: "/səˈsteɪnəbl/", frequency: "common", synonyms: ["eco-friendly"], antonyms: [], examples: ["Sustainable living.", "Sustainable materials."] }
                },
                adverbs: {
                    aesthetically: { definition: "In a way relating to beauty", phonetic: "/iːsˈθetɪkli/", frequency: "intermediate", synonyms: ["beautifully"], antonyms: [], examples: ["Aesthetically pleasing.", "Aesthetically designed."] }
                },
                idioms: {
                    "creature comforts": { definition: "Things that make life comfortable", frequency: "intermediate", examples: ["I enjoy my creature comforts at home."] }
                },
                collocations: {
                    "interior design": { definition: "The art of decorating indoor spaces", frequency: "common", examples: ["She studied interior design."] }
                }
            }
        }
    };

    // =============================================
    // Natural Conversation Flow System
    // =============================================

    const conversationFlow = {
        // Conversation contexts that create natural dialogue
        contexts: {
            greeting: {
                easy: ["Hi!", "Hello!", "Hey there!", "Good morning!", "Good afternoon!"],
                medium: ["Hey, how's it going?", "Good to see you!", "Hello, how are you today?"],
                hard: ["I trust you're doing well today.", "Greetings, I hope this finds you in good spirits."]
            },
            response_greeting: {
                easy: ["I'm good, thanks!", "Pretty good!", "I'm fine!", "Not bad!"],
                medium: ["I'm doing well, thank you for asking.", "Can't complain!", "Things are going smoothly."],
                hard: ["I appreciate you asking. Things are progressing quite well.", "All things considered, I'm doing remarkably well."]
            },
            topic_intro: {
                easy: [
                    "So, I wanted to talk about the {noun}.",
                    "Hey, did you see the {noun}?",
                    "I've been thinking about the {noun}.",
                    "Have you noticed the {noun} lately?"
                ],
                medium: [
                    "I've been meaning to discuss the {noun} with you.",
                    "There's something about the {noun} I wanted to mention.",
                    "The {noun} has been on my mind lately.",
                    "Speaking of work, what do you think about the {noun}?"
                ],
                hard: [
                    "I've been contemplating the implications of the {noun}.",
                    "There's a matter regarding the {noun} that warrants our attention.",
                    "I believe the {noun} deserves careful consideration."
                ]
            },
            agreement: {
                easy: ["Yes, totally!", "I know, right?", "Exactly!", "That's true!"],
                medium: ["I completely agree with you.", "You make a valid point.", "That's exactly what I was thinking."],
                hard: ["Your observation is quite astute.", "I concur with your assessment.", "Indeed, that aligns with my perspective."]
            },
            elaboration: {
                easy: [
                    "And the {noun} is really {adjective}.",
                    "I think it's quite {adjective}.",
                    "It seems very {adjective} to me."
                ],
                medium: [
                    "Moreover, the {noun} appears to be {adjective}.",
                    "What's interesting is how {adjective} the {noun} has become.",
                    "I've noticed the {noun} is increasingly {adjective}."
                ],
                hard: [
                    "Furthermore, one cannot overlook how {adjective} the {noun} has proven to be.",
                    "The {adjective} nature of the {noun} is particularly noteworthy.",
                    "It's worth mentioning that the {noun} demonstrates {adjective} characteristics."
                ]
            },
            question: {
                easy: [
                    "What do you think about it?",
                    "Don't you agree?",
                    "Have you seen it?",
                    "Did you know that?"
                ],
                medium: [
                    "What's your take on this?",
                    "How do you feel about the situation?",
                    "Have you given this much thought?",
                    "Would you agree with that assessment?"
                ],
                hard: [
                    "What insights might you offer on this matter?",
                    "How would you characterize the current state of affairs?",
                    "Would you concur with this interpretation?"
                ]
            },
            answer: {
                easy: [
                    "Well, I think the {noun} is {adjective}.",
                    "In my opinion, it's really {adjective}.",
                    "I'd say it's quite {adjective}."
                ],
                medium: [
                    "Based on my experience, the {noun} tends to be {adjective}.",
                    "From what I've observed, I'd say it's {adjective}.",
                    "Considering everything, I believe it's {adjective}."
                ],
                hard: [
                    "After careful consideration, I would posit that the {noun} is inherently {adjective}.",
                    "My assessment suggests that the {noun} is fundamentally {adjective}.",
                    "Upon reflection, I'm inclined to characterize the {noun} as {adjective}."
                ]
            },
            transition: {
                easy: ["By the way,", "Oh, and", "Also,", "Speaking of which,"],
                medium: ["On a related note,", "That reminds me,", "Interestingly,", "Moving on,"],
                hard: ["This brings me to another point:", "In a similar vein,", "Furthermore,", "This naturally leads to the question of"]
            },
            closing: {
                easy: ["Anyway, I should go.", "See you later!", "Talk to you soon!", "Bye for now!"],
                medium: ["Well, I should probably get going.", "It was great talking to you.", "Let's catch up again soon."],
                hard: ["I should take my leave now.", "This has been a most enlightening discussion.", "I look forward to continuing this dialogue."]
            }
        },

        // Tone adjustments
        toneModifiers: {
            formal: {
                prefix: ["I believe that", "It would appear that", "One might observe that"],
                suffix: ["if I may say so.", "wouldn't you agree?", "as it were."]
            },
            informal: {
                prefix: ["Honestly,", "You know,", "Like,", "So basically,"],
                suffix: ["you know?", "right?", "or whatever.", "and stuff."]
            },
            neutral: {
                prefix: ["I think", "It seems like", "In my view,"],
                suffix: [".", "I suppose.", "in my opinion."]
            }
        }
    };

    // =============================================
    // Topic Display Names
    // =============================================

    const topicNames = {
        office: "Office & Workplace",
        home: "Home & Family",
        shopping: "Shopping & Retail",
        meeting: "Business Meeting",
        restaurant: "Restaurant & Dining",
        travel: "Travel & Vacation",
        health: "Health & Medical",
        education: "Education & School",
        technology: "Technology & Gadgets",
        sports: "Sports & Fitness",
        entertainment: "Entertainment & Movies",
        weather: "Weather & Seasons",
        finance: "Banking & Finance",
        socialMedia: "Social Media & Internet"
    };

    // =============================================
    // State Management
    // =============================================

    let currentConversation = [];
    let usedVocabulary = {
        nouns: new Set(),
        verbs: new Set(),
        adjectives: new Set(),
        adverbs: new Set(),
        idioms: new Set(),
        collocations: new Set()
    };
    let vocabularyDetails = {};

    // Speech state
    let speechState = {
        utterance: null,
        isPaused: false,
        isPlaying: false,
        currentLineIndex: 0,
        totalLines: 0
    };

    // =============================================
    // Utility Functions
    // =============================================

    function getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function getVocabularyData(topic, difficulty) {
        const topicData = vocabularyDatabase[topic] || vocabularyDatabase.office;
        return topicData[difficulty] || topicData.easy;
    }

    function showToast(message, type = 'success') {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<span class="toast-message">${message}</span>`;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    // =============================================
    // Theme Management
    // =============================================

    function initTheme() {
        const savedTheme = localStorage.getItem('vocabbot-theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);

        document.getElementById('themeToggle').addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('vocabbot-theme', newTheme);
        });
    }

    // =============================================
    // Natural Conversation Generation
    // =============================================

    function generateNaturalConversation(topic, difficulty, charLimit, tone) {
        // Reset tracking
        usedVocabulary = {
            nouns: new Set(),
            verbs: new Set(),
            adjectives: new Set(),
            adverbs: new Set(),
            idioms: new Set(),
            collocations: new Set()
        };
        vocabularyDetails = {};

        const vocab = getVocabularyData(topic, difficulty);
        const flow = conversationFlow;
        const lines = [];
        let currentChar = 0;
        let speaker = 'A';
        let conversationPhase = 'greeting';
        let turnCount = 0;

        // Helper to get random vocabulary
        const getWord = (type) => {
            const words = vocab[type] || {};
            const keys = Object.keys(words);
            if (keys.length === 0) return type === 'nouns' ? 'thing' : type === 'verbs' ? 'do' : type === 'adjectives' ? 'good' : 'well';
            const word = getRandomItem(keys);

            if (words[word]) {
                usedVocabulary[type].add(word);
                vocabularyDetails[word] = { ...words[word], type: type.slice(0, -1) };
            }
            return word;
        };

        // Helper to fill template
        const fillTemplate = (template) => {
            return template
                .replace(/{noun}/g, getWord('nouns'))
                .replace(/{verb}/g, getWord('verbs'))
                .replace(/{adjective}/g, getWord('adjectives'))
                .replace(/{adverb}/g, getWord('adverbs'));
        };

        // Apply tone modifier
        const applyTone = (text) => {
            const mod = flow.toneModifiers[tone] || flow.toneModifiers.neutral;
            if (Math.random() < 0.3) {
                text = getRandomItem(mod.prefix) + ' ' + text.toLowerCase();
            }
            return text;
        };

        // Conversation phases for natural flow
        const phases = ['greeting', 'response', 'topic', 'discuss', 'discuss', 'elaborate', 'question', 'answer', 'discuss', 'closing'];

        while (currentChar < charLimit && turnCount < 30) {
            let text = '';
            const phase = phases[Math.min(turnCount, phases.length - 1)] || 'discuss';

            switch (phase) {
                case 'greeting':
                    text = getRandomItem(flow.contexts.greeting[difficulty] || flow.contexts.greeting.easy);
                    break;
                case 'response':
                    text = getRandomItem(flow.contexts.response_greeting[difficulty] || flow.contexts.response_greeting.easy);
                    break;
                case 'topic':
                    text = fillTemplate(getRandomItem(flow.contexts.topic_intro[difficulty] || flow.contexts.topic_intro.easy));
                    break;
                case 'discuss':
                    // Mix of elaborations, agreements, and vocabulary sentences
                    const rand = Math.random();
                    if (rand < 0.15 && Object.keys(vocab.idioms || {}).length > 0) {
                        // Use an idiom
                        const idiomKeys = Object.keys(vocab.idioms);
                        const idiomKey = getRandomItem(idiomKeys);
                        usedVocabulary.idioms.add(idiomKey);
                        vocabularyDetails[idiomKey] = { ...vocab.idioms[idiomKey], type: 'idiom' };
                        text = getRandomItem(vocab.idioms[idiomKey].examples);
                    } else if (rand < 0.25 && Object.keys(vocab.collocations || {}).length > 0) {
                        // Use a collocation
                        const collKeys = Object.keys(vocab.collocations);
                        const collKey = getRandomItem(collKeys);
                        usedVocabulary.collocations.add(collKey);
                        vocabularyDetails[collKey] = { ...vocab.collocations[collKey], type: 'collocation' };
                        text = getRandomItem(vocab.collocations[collKey].examples);
                    } else if (rand < 0.4) {
                        text = getRandomItem(flow.contexts.agreement[difficulty] || flow.contexts.agreement.easy);
                    } else {
                        text = fillTemplate(getRandomItem(flow.contexts.elaboration[difficulty] || flow.contexts.elaboration.easy));
                    }
                    text = applyTone(text);
                    break;
                case 'elaborate':
                    text = fillTemplate(getRandomItem(flow.contexts.elaboration[difficulty] || flow.contexts.elaboration.easy));
                    break;
                case 'question':
                    text = getRandomItem(flow.contexts.question[difficulty] || flow.contexts.question.easy);
                    break;
                case 'answer':
                    text = fillTemplate(getRandomItem(flow.contexts.answer[difficulty] || flow.contexts.answer.easy));
                    break;
                case 'closing':
                    text = getRandomItem(flow.contexts.closing[difficulty] || flow.contexts.closing.easy);
                    break;
            }

            text = capitalizeFirst(text);
            const lineLength = text.length + 5;

            if (currentChar + lineLength > charLimit && turnCount > 4) {
                // Add closing if near limit
                const closing = getRandomItem(flow.contexts.closing[difficulty] || flow.contexts.closing.easy);
                if (currentChar + closing.length + 5 <= charLimit) {
                    lines.push({ speaker, text: closing });
                }
                break;
            }

            lines.push({ speaker, text });
            currentChar += lineLength;
            speaker = speaker === 'A' ? 'B' : 'A';
            turnCount++;
        }

        currentConversation = lines;
        return lines;
    }

    // =============================================
    // Output Formatting
    // =============================================

    function formatConversation(lines, highlightWords, showDefinitions) {
        const container = document.getElementById('conversationBox');
        container.innerHTML = '';

        lines.forEach((line, index) => {
            const lineDiv = document.createElement('div');
            lineDiv.className = `conversation-line speaker-${line.speaker.toLowerCase()}`;
            lineDiv.style.animationDelay = `${index * 0.05}s`;

            let text = line.text;
            if (highlightWords) {
                text = highlightVocabularyInText(text, showDefinitions);
            }

            lineDiv.innerHTML = `
                <div class="speaker-avatar">${line.speaker}</div>
                <div class="conversation-bubble">${text}</div>
            `;

            container.appendChild(lineDiv);
        });
    }

    function highlightVocabularyInText(text, showDefinitions) {
        let result = text;
        const allWords = Object.keys(vocabularyDetails).sort((a, b) => b.length - a.length);

        allWords.forEach(word => {
            const details = vocabularyDetails[word];
            const regex = new RegExp(`\\b(${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b`, 'gi');
            const dataAttr = showDefinitions ? `data-word="${word}"` : '';
            result = result.replace(regex, `<span class="vocab-word ${details.type}" ${dataAttr}>$1</span>`);
        });

        return result;
    }

    function getPlainTextConversation(lines) {
        return lines.map(line => `${line.speaker}: ${line.text}`).join('\n');
    }

    // =============================================
    // Vocabulary Panel
    // =============================================

    function renderVocabularyPanel(filter = 'all') {
        const vocabList = document.getElementById('vocabList');
        if (!vocabList) return;

        let words = [];

        const addWords = (set, type) => {
            set.forEach(word => {
                if (vocabularyDetails[word]) {
                    words.push({ word, ...vocabularyDetails[word] });
                }
            });
        };

        if (filter === 'all' || filter === 'nouns') addWords(usedVocabulary.nouns, 'noun');
        if (filter === 'all' || filter === 'verbs') addWords(usedVocabulary.verbs, 'verb');
        if (filter === 'all' || filter === 'adjectives') addWords(usedVocabulary.adjectives, 'adjective');
        if (filter === 'all' || filter === 'adverbs') addWords(usedVocabulary.adverbs, 'adverb');
        if (filter === 'all' || filter === 'idioms') {
            addWords(usedVocabulary.idioms, 'idiom');
            addWords(usedVocabulary.collocations, 'collocation');
        }

        if (words.length === 0) {
            vocabList.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 2rem; grid-column: 1/-1;">No vocabulary words in this category.</p>';
            return;
        }

        vocabList.innerHTML = words.map(item => `
            <div class="vocab-card">
                <div class="vocab-card-header">
                    <span class="vocab-card-word">${item.word}</span>
                    <span class="vocab-card-type ${item.type}">${item.type}</span>
                    ${item.phonetic ? `<span class="vocab-card-phonetic">${item.phonetic}</span>` : ''}
                </div>
                <div class="vocab-card-definition">${item.definition}</div>
            </div>
        `).join('');
    }

    // =============================================
    // Tooltip Management
    // =============================================

    function initTooltip() {
        const tooltip = document.getElementById('tooltip');

        document.addEventListener('mouseover', (e) => {
            const target = e.target.closest('.vocab-word[data-word]');
            if (!target) return;

            const word = target.dataset.word;
            const details = vocabularyDetails[word];
            if (!details) return;

            tooltip.innerHTML = `
                <div class="tooltip-word">${word}${details.phonetic ? `<span class="tooltip-phonetic">${details.phonetic}</span>` : ''}</div>
                <div class="tooltip-definition">${details.definition}</div>
                ${details.examples && details.examples[0] ? `<div class="tooltip-example">"${details.examples[0]}"</div>` : ''}
            `;

            const rect = target.getBoundingClientRect();
            tooltip.style.left = `${rect.left}px`;
            tooltip.style.top = `${rect.bottom + 8}px`;
            tooltip.classList.add('visible');
        });

        document.addEventListener('mouseout', (e) => {
            if (!e.target.closest('.vocab-word[data-word]')) return;
            tooltip.classList.remove('visible');
        });
    }

    // =============================================
    // Speech Synthesis Controls
    // =============================================

    function initSpeechControls() {
        const speakBtn = document.getElementById('speakBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const resumeBtn = document.getElementById('resumeBtn');
        const stopBtn = document.getElementById('stopBtn');
        const progressFill = document.getElementById('speechProgress');
        const progressText = document.getElementById('speechProgressText');
        const speedSelect = document.getElementById('speechSpeed');

        if (!('speechSynthesis' in window)) {
            speakBtn.disabled = true;
            progressText.textContent = 'Not supported';
            return;
        }

        const synth = window.speechSynthesis;

        const updateProgress = () => {
            const progress = (speechState.currentLineIndex / speechState.totalLines) * 100;
            progressFill.style.width = `${progress}%`;
            progressText.textContent = `${speechState.currentLineIndex}/${speechState.totalLines} lines`;
        };

        const speakLine = (index) => {
            if (index >= currentConversation.length) {
                // Finished
                resetSpeechControls();
                progressText.textContent = 'Completed';
                return;
            }

            const line = currentConversation[index];
            const text = `${line.speaker} says: ${line.text}`;
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = parseFloat(speedSelect.value);

            utterance.onend = () => {
                speechState.currentLineIndex++;
                updateProgress();
                if (speechState.isPlaying && !speechState.isPaused) {
                    speakLine(speechState.currentLineIndex);
                }
            };

            utterance.onerror = () => {
                resetSpeechControls();
                progressText.textContent = 'Error';
            };

            speechState.utterance = utterance;
            synth.speak(utterance);
        };

        const resetSpeechControls = () => {
            speechState.isPlaying = false;
            speechState.isPaused = false;
            speechState.currentLineIndex = 0;
            speakBtn.disabled = false;
            speakBtn.classList.remove('active');
            pauseBtn.disabled = true;
            resumeBtn.style.display = 'none';
            speakBtn.style.display = 'flex';
            stopBtn.disabled = true;
            progressFill.style.width = '0%';
        };

        speakBtn.addEventListener('click', () => {
            if (currentConversation.length === 0) return;

            synth.cancel();
            speechState.isPlaying = true;
            speechState.isPaused = false;
            speechState.currentLineIndex = 0;
            speechState.totalLines = currentConversation.length;

            speakBtn.disabled = true;
            speakBtn.classList.add('active');
            pauseBtn.disabled = false;
            stopBtn.disabled = false;
            progressText.textContent = 'Playing...';

            updateProgress();
            speakLine(0);
        });

        pauseBtn.addEventListener('click', () => {
            synth.pause();
            speechState.isPaused = true;
            pauseBtn.style.display = 'none';
            resumeBtn.style.display = 'flex';
            progressText.textContent = 'Paused';
        });

        resumeBtn.addEventListener('click', () => {
            synth.resume();
            speechState.isPaused = false;
            resumeBtn.style.display = 'none';
            pauseBtn.style.display = 'flex';
            progressText.textContent = 'Playing...';
        });

        stopBtn.addEventListener('click', () => {
            synth.cancel();
            resetSpeechControls();
            progressText.textContent = 'Stopped';
        });

        speedSelect.addEventListener('change', () => {
            // Speed will apply to next utterance
        });
    }

    // =============================================
    // Export Functionality
    // =============================================

    function exportVocabulary() {
        const words = [];

        Object.entries(vocabularyDetails).forEach(([word, details]) => {
            words.push({
                word,
                type: details.type,
                definition: details.definition,
                phonetic: details.phonetic || '',
                synonyms: details.synonyms?.join(', ') || '',
                examples: details.examples?.join(' | ') || ''
            });
        });

        if (words.length === 0) {
            showToast('No vocabulary to export', 'error');
            return;
        }

        // Create CSV
        const headers = ['Word', 'Type', 'Definition', 'Phonetic', 'Synonyms', 'Examples'];
        const csv = [
            headers.join(','),
            ...words.map(w => [
                `"${w.word}"`,
                `"${w.type}"`,
                `"${w.definition}"`,
                `"${w.phonetic}"`,
                `"${w.synonyms}"`,
                `"${w.examples}"`
            ].join(','))
        ].join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'vocabulary.csv';
        a.click();
        URL.revokeObjectURL(url);

        showToast('Vocabulary exported successfully!');
    }

    // =============================================
    // Form Validation and Submission
    // =============================================

    function validateForm() {
        let isValid = true;

        // Difficulty
        const difficulty = document.querySelector('input[name="difficulty"]:checked');
        const diffError = document.getElementById('difficultyError');
        if (!difficulty) {
            diffError.textContent = 'Please select a difficulty level';
            isValid = false;
        } else {
            diffError.textContent = '';
        }

        // Topic
        const topic = document.getElementById('topic').value;
        const topicError = document.getElementById('topicError');
        if (!topic) {
            topicError.textContent = 'Please select a topic';
            isValid = false;
        } else {
            topicError.textContent = '';
        }

        // Character limit
        const charLimit = document.getElementById('charLimit').value;
        const charError = document.getElementById('charLimitError');
        if (!charLimit || charLimit < 100 || charLimit > 10000) {
            charError.textContent = 'Please enter a value between 100 and 10000';
            isValid = false;
        } else {
            charError.textContent = '';
        }

        return isValid;
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!validateForm()) return;

        const difficulty = document.querySelector('input[name="difficulty"]:checked').value;
        const topic = document.getElementById('topic').value;
        const tone = document.getElementById('tone').value;
        const charLimit = parseInt(document.getElementById('charLimit').value);
        const highlightWords = document.getElementById('highlightWords').checked;
        const showDefinitions = document.getElementById('showDefinitions').checked;
        const showVocabPanel = document.getElementById('showVocabPanel').checked;

        // Generate conversation
        const lines = generateNaturalConversation(topic, difficulty, charLimit, tone);

        // Show output
        document.getElementById('emptyState').style.display = 'none';
        document.getElementById('outputContent').classList.add('active');

        // Format and display
        formatConversation(lines, highlightWords, showDefinitions);

        // Update meta
        document.getElementById('outputMeta').textContent =
            `${topicNames[topic]} • ${capitalizeFirst(difficulty)} • ${capitalizeFirst(tone)}`;

        // Update stats
        const totalChars = lines.reduce((sum, l) => sum + l.text.length, 0);
        const totalWords = Object.keys(vocabularyDetails).length;
        document.getElementById('outputStats').innerHTML = `
            <span class="stat-item">Characters: <span class="stat-value">${totalChars}</span></span>
            <span class="stat-item">Lines: <span class="stat-value">${lines.length}</span></span>
            <span class="stat-item">Vocabulary: <span class="stat-value">${totalWords} words</span></span>
        `;

        // Vocabulary panel - always render, visibility controlled by CSS/checkbox
        renderVocabularyPanel('all');
    }

    function handleReset() {
        document.getElementById('generatorForm').reset();
        document.getElementById('emptyState').style.display = 'flex';
        document.getElementById('outputContent').classList.remove('active');

        // Reset errors
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        // Stop speech if playing
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }

        // Reset vocab panel
        document.getElementById('vocabList').innerHTML = `
            <div class="vocab-empty">
                <p>Generate a conversation to see vocabulary here</p>
            </div>
        `;

        currentConversation = [];
        vocabularyDetails = {};
    }

    // =============================================
    // Initialization
    // =============================================

    function init() {
        // Theme
        initTheme();

        // Tooltip
        initTooltip();

        // Speech controls
        initSpeechControls();

        // Form submission
        document.getElementById('generatorForm').addEventListener('submit', handleSubmit);

        // Reset button
        document.getElementById('resetBtn').addEventListener('click', handleReset);

        // Copy button
        document.getElementById('copyBtn').addEventListener('click', async () => {
            if (currentConversation.length === 0) return;

            const text = getPlainTextConversation(currentConversation);
            try {
                await navigator.clipboard.writeText(text);
                showToast('Conversation copied to clipboard!');
            } catch (err) {
                showToast('Failed to copy', 'error');
            }
        });

        // Export button
        document.getElementById('exportVocabBtn').addEventListener('click', exportVocabulary);

        // Vocabulary tabs
        document.getElementById('vocabTabs').addEventListener('click', (e) => {
            const tab = e.target.closest('.vocab-tab');
            if (!tab) return;

            document.querySelectorAll('.vocab-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderVocabularyPanel(tab.dataset.tab);
        });

        // Display options live update
        ['highlightWords', 'showDefinitions'].forEach(id => {
            document.getElementById(id).addEventListener('change', () => {
                if (currentConversation.length > 0) {
                    const highlightWords = document.getElementById('highlightWords').checked;
                    const showDefinitions = document.getElementById('showDefinitions').checked;
                    formatConversation(currentConversation, highlightWords, showDefinitions);
                }
            });
        });

        // Vocab panel toggle
        document.getElementById('showVocabPanel').addEventListener('change', (e) => {
            const vocabPanel = document.getElementById('vocabPanel');
            vocabPanel.style.display = e.target.checked ? 'flex' : 'none';
        });
    }

    // Start the app
    document.addEventListener('DOMContentLoaded', init);
})();
