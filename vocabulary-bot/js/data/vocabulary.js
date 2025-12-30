/**
 * Vocabulary Database
 * Contains word definitions organized by topic and difficulty
 */

const VocabularyDatabase = {
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

// Topic display names
const TopicNames = {
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
