const slugify = require('../utils/slugify')

const rawCharacters = [
  {
    name: 'Klein Moretti',
    aliases: ['The Fool', 'Mr World', 'German Sparrow'],
    category: 'Tarot Club Members',
    age: '33',
    height: '180 cm',
    pathway: 'Fool',
    sequence: 'Above the Sequence - Lord Of The Mysteries',
    description: 'Klein Moretti, the protagonist of Lord of the Mysteries, is a former history graduate who transmigrates into a mysterious, steampunk world filled with Beyonders, secret organizations, and ancient gods. Initially cautious and analytical, Klein grows from a struggling detective into the powerful “Fool,” a hidden deity manipulating fate from behind the scenes. His defining traits are his meticulous planning, dark humor, and strong moral compass, often at odds with the madness of his path. Balancing sanity and divinity, Klein embodies both the rational scholar and the inscrutable god, navigating chaos with wit, paranoia, and an unyielding will to survive.',
    image: 'Klein_Moretti_Official.webp'
  },
  {
    name: 'Audrey Hall',
    aliases: ['Miss Justice'],
    category: 'Tarot Club Members',
    age: '26',
    height: '167 cm',
    pathway: 'Spectator',
    sequence: 'Sequence 2 - Discerner',
    description: 'Rebellious noble who uses psychology to free consciences.',
    image: 'Audrey_Hall_Official.webp'
  },
  {
    name: 'Alger Wilson',
    aliases: ['The Hanged Man'],
    category: 'Tarot Club Members',
    age: '40',
    height: '185 cm',
    pathway: 'Hanged Man',
    sequence: 'Sequence 2 - Profane Presbyter',
    description: 'Alger Wilson is a Beyonder who follows the Tyrant Pathway. He belongs to the Church of the Lord of Storms and is the captain of the Blue Avenger. He is calm, experienced, and has ambitions to usurp power inside the church. He secretly promoted to rank 5 without the knowledge of the Church of the Lord of Storms, and currently aims to become an angel. He is part of the Tarot Club, where he takes on the pseudonym of the Hanged Man. Later, he advanced to Sequence 2 Profane Presbyter of the Hanged Man Pathway after switching from the Tyrant Pathway. He is known as a maritime king without the title of a Pirate King, Stormbringer Alger. He is also the current Sea God and a legendary adventurer.',
    image: 'Alger_Wilson_Official.webp'
  },
  {
    name: 'Derrick Berg',
    aliases: ['The Sun'],
    category: 'Tarot Club Members',
    age: '23',
    height: '175 cm',
    pathway: 'Sun',
    sequence: 'Sequence 2 - Lightseeker',
    description: 'Derrick Berg is a pivotal character in Lord of the Mysteries, known for his unwavering optimism and dedication to restoring sunlight to his homeland, the City of Silver. After tragically being forced to kill his parents due to a curse, Derrick prayed for assistance and was drawn into the Gray Fog, where he joined the Tarot Club under the codename "The Sun." He provided invaluable historical knowledge and Beyonder materials to the club, aiding their endeavors. Over time, Derrick advanced in the Sun Pathway, becoming a Sequence 2 Lightseeker. His leadership and vision were instrumental in leading the City of Silver out of the Forsaken Land of the Gods, establishing a new home in the Rorsted Archipelago, and founding the Church of the Fool. By 1358, he ascended to the position of Pope, embodying hope and resilience for his people.',
    image: 'Derrick_Berg_Official.webp'
  },
  {
    name: 'Ince Zangwill',
    aliases: ['Red Glove Bishop'],
    category: 'Villains',
    age: '40',
    height: '181 cm',
    pathway: 'Sleepless',
    sequence: 'Sequence 4 - Nightwatcher',
    description: 'Ince Zangwill was a former Archbishop in the Church of the Evernight Goddess and a Gatekeeper who failed in his promotion. He defected from the church with the forbidden relic 0-08: Quill of Alzuhod. He exchanged to Nightwatcher of the Darkness Pathway after stealing Saint Selenas Ashes. He was cautious and careful, enjoying scheming in the shadows and setting traps. Driven by ambition, he fearlessly plotted to hunt down high-ranking deacons in retaliation against the Church of the Evernight Goddess. He was killed by Klein with the help of Leonard and Daly, as well as the Author Adam behind the scenes manipulating the stage.',
    image: 'Ince_Zangwill_Official.webp'
  },
  {
    name: 'Amon',
    aliases: ['The Blasphemer', 'Angel of Time'],
    category: 'Villains',
    age: 'Unknown',
    height: 'Variable',
    pathway: 'Error',
    sequence: 'Sequence 1 - Worm of Time',
    description: 'Amon, originally known as the Angel of Time, is a pivotal figure in Lord of the Mysteries. Born as a Sequence 1 Worm of Time with the Image Error Uniqueness, he was one of the Kings of Angels from the Third Epoch and a child of the Ancient Sun God. In 1352, he advanced to Sequence 0 by replacing Mr. Door in his Apotheosis Ritual. Shortly after, he ascended to become a Dual-Pathway True God, accommodating the Image Door Uniqueness and a Key of Stars Beyonder characteristic. After his defeat by Klein, he revived in an avatar guarded by Adam and left for the Cosmos, seeking the meaning of humanity. In 1358, he returned, replaced Termiboros, and switched to Sequence 1 Angel of Redemption of the Eternal Aeon Pathway by the time of the 1359 Project Vortex. By 1360, he successfully parasitized the Great Mother-assistant Miracle Invoker Zaratul through the latters Historical Projection.',
    image: 'Amon_Official.webp'
  },
  {
    name: 'Mr. A',
    aliases: ['Primordial Apostle'],
    category: 'Villains',
    age: 'Unknown',
    height: '186 cm',
    pathway: 'Hanged man',
    sequence: 'Sequence 5 - Sheperd',
    description: 'Mr. A was a Beyonder of the Hanged Man Pathway and a member of the Aurora Order, serving as one of its 22 Oracles. He organized secret Beyonder gatherings in Backlund, facilitating trades and rituals. Devoted to the True Creator, he sought to orchestrate the deitys descent onto the world. Despite several failed attempts, Mr. A remained resolute in his mission. His endeavors led to confrontations with Klein Moretti, resulting in his eventual demise at the hands of the Grade 0 containment asset 0-17 "Angel of Concealment." After his death, he was sent to the Foggy Town.',
    image: 'Mr A.jpg'
  },
  {
    name: 'Leonard Mitchell',
    aliases: ['The Star'],
    category: 'Tarot Club Members',
    age: '32',
    height: '180 cm',
    pathway: 'Sleepless',
    sequence: 'Sequence 2 - Servant of Concealment',
    description: 'Leonard Mitchell is a high-ranking deacon in the Church of the Evernight Goddess and a member of the Tarot Club, codenamed "The Star." Originally from Tingen City, he was a member of the Nighthawks before becoming the captain of the Red Gloves in Backlund. Leonard is known for his relaxed demeanor and poetic temperament. He is currently hosting a parasite of the Error Pathway named Pallez Zoroast, an Angel of the Zoroast Family, who guides him after losing most of "His" power. Leonard is a Sequence 2 Servant of Concealment from the Darkness Pathway.',
    image: 'Leonard_Mitchell_Official.webp'
  },
  {
    name: 'Melissa Moretti',
    aliases: [],
    category: 'Relevant Characters',
    age: '28',
    height: '166 cm',
    pathway: 'Savant',
    sequence: 'Sequence 7 - Appraiser',
    description: 'Melissa Moretti is the youngest sibling of Klein Moretti in Lord of the Mysteries. Initially a civilian with no belief in the occult, she becomes a Sequence 9 Savant after receiving the potion from her mentor, Chancellor Portland Moment. Her transformation into a Beyonder is a significant development in the narrative. Melissa is depicted as a kind-hearted and responsible young woman who deeply cares for her two brothers. She strives to save money and live modestly, reflecting her dedication to her familys well-being. Her character adds a layer of normalcy and emotional depth to the story.',
    image: 'Melissa Moretti.webp'
  },
  {
    name: 'Dunn Smith',
    aliases: ['Captain'],
    category: 'Relevant Characters',
    age: '34',
    height: '188 cm',
    pathway: 'Sleepless',
    sequence: 'Sequence 7 - Nightmare',
    description: 'Dunn Smith is the captain of the Nighthawks in Tingen City, a division under the Church of the Evernight Goddess. A Sequence 7 Beyonder of the Darkness Pathway, he wields the Nightmare ability, granting him formidable combat prowess. Despite his power, Dunn is characterized by a mild demeanor and a notably poor memory—a side effect of his chosen pathway. He is deeply committed to his team, often prioritizing their well-being over his own. Dunns selflessness and leadership make him a respected figure among his peers. He ultimately sacrifices himself to protect Tingen City from a formidable threat.',
    image: 'Dunn_Smith_Official.webp'
  },
  {
    name: 'Emlyn White',
    aliases: ['Bloodless Pharmacist'],
    category: 'Tarot Club Members',
    age: '46',
    height: '183 cm',
    pathway: 'Moon',
    sequence: 'Sequence 2 - Life Giver',
    description: 'Emlyn White is a Sanguine and a high-ranking deacon in the Harvest Church. He is also a member of the Tarot Club with the codename "The Moon." Emlyn is prideful by nature, believing he was chosen by Lilith to save the Sanguines. He is wealthy and has a penchant for collecting dolls, preferring to stay indoors tending to them. Emlyns journey leads him to become a Sequence 2 Life-Giver from the Moon Pathway. His transformation and role in the narrative explore themes of identity, belief, and the complexities of his existence as a Sanguine.',
    image: 'Emlyn_White_Official.webp'
  },
  {
    name: 'Goddess of the Dark Night',
    aliases: ['Evernight Goddess', 'Amanises'],
    category: 'Gods',
    age: 'Primordial',
    height: 'Incarnates as needed',
    pathway: 'Sleepless',
    sequence: 'Sequence 0 - Darkness',
    description: 'The Evernight Goddess, originally known as Amanises, is an Outer Deity embodying darkness, misfortune, and concealment. She was formed from the eye of the Original Creator and awakened at the end of the Second Epoch. In the Third Epoch, she helped humanity through the Cataclysm and played a pivotal role in the downfall of the Ancient Sun God by leading the Rose Redemption faction. She later ascended to Sequence 0 of the Darkness Pathway. Her divine kingdom, Tenebrous Heaven, is located in the Amantha mountain range. In the Fifth Epoch, she intervened in Klein Morettis transmigration, aiding his survival and eventual rise.',
    image: 'PM_Evernight_Goddess.webp'
  },
  {
    name: 'God of Steam and Machinery',
    aliases: ['God of Craftmanship', 'Stiano'],
    category: 'Gods',
    age: 'Second Epoch',
    height: 'Unknown',
    pathway: 'Savant',
    sequence: 'Sequence 0 - Paragon',
    description: 'The God of Steam and Machinery is an Outer Deity and the Sequence 0 God of the Paragon Pathway. Originally known as Yuggs Stiano, he was a former member of the Moses Ascetic Order. After the rise of the Industrial Revolution, he rebranded himself from the God of Craftsmanship to the God of Steam and Machinery, aligning with the technological advancements of the Fifth Epoch. In 1359, he acquired the Uniqueness of the Hermit Pathway. During the Apocalypse, he joined the Celestial Masters formation, temporarily gaining quasi-Demon of Knowledge strength to combat the Outer Deities. Following the event, his church maintained influence, ranking below the three main religions.',
    image: 'PM_God_of_Steam_and_Machinery.webp'
  },
  {
    name: 'Lord of the Storm',
    aliases: ['Wind Angel', 'Leodero'],
    category: 'Gods',
    age: 'First Epoch',
    height: 'Unknown',
    pathway: 'Sailor',
    sequence: 'Sequence 0 - Tyrant',
    description: 'The Lord of Storms, originally known as Leodero, was one of the Eight Kings of Angels under the Ancient Sun God during the Third Epoch. After the fall of the Ancient Sun God, Leodero joined the Rose Redemption faction, contributing to the deitys demise. He then ascended to Sequence 0 of the Tyrant Pathway. In the Fourth Epoch, he supported the establishment of the Loen Kingdom, aligning with the Evernight Goddess and the God of Craftsmanship. His divine kingdom, the Chasm of Storms, was located on Pasu Island. In the Fifth Epoch, he opposed the Apotheosis of George III, leading to the failure of his ritual. He was ultimately killed by the Lord of Storms in a suicidal attack against the Outer Deities out of pride.',
    image: 'PM_Lord_of_Storms.webp'
  },
  {
    name: 'God of Knowledge and Wisdom',
    aliases: ['Herabergen'],
    category: 'Gods',
    age: 'First Epoch',
    height: 'Unknown',
    pathway: 'White Tower',
    sequence: 'Sequence 0 - White Tower',
    description: 'The God of Knowledge and Wisdom is an Outer Deity and the Sequence 0 God of the White Tower Pathway. Originally known as Herabergen, he served as the Wisdom Angel under the Ancient Sun God and later as a Subsidiary God of the Dragon of Imagination, Ankewelt. After the death of Ankewelt, he joined the Rose Redemption faction and played a pivotal role in the downfall of the Ancient Sun God. He then ascended to Sequence 0 of the White Tower Pathway. In the Fifth Epoch, he supported the Feynapotter Kingdom and later the Church of the God of Knowledge and Wisdom. He voluntarily fused with Adam, the True Creator, in 1360.',
    image: 'PM_God_of_Knowledge_and_Wisdom.webp'
  },
  {
    name: 'The Eternal Blazing Sun',
    aliases: ['White Angel'],
    category: 'Gods',
    age: 'First Epoch',
    height: 'Cosmic scale',
    pathway: 'Sun',
    sequence: 'Sequence 0 - Sun',
    description: 'The Eternal Blazing Sun is a Deity symbolizing light, order, and contracts. Originally known as Aucuses, he served as the White Angel under the Ancient Sun God. Following the downfall of the Ancient Sun God, Aucuses ascended to Sequence 0 of the Sun Pathway with the aid of the Evernight Goddess. He founded the Church of the Eternal Blazing Sun, with the Intis Republic as its primary follower. His influence extends across multiple epochs, and he played a significant role in various divine conflicts. Ultimately, he was killed by the Evernight Goddess',
    image: 'PM_Eternal_Blazing_Sun.webp'
  },
  {
    name: 'Anthony Reid',
    aliases: ['Four of Swords'],
    category: 'Relevant Characters',
    age: '40',
    height: '173cm',
    pathway: 'Visionary',
    sequence: 'Sequence 4 - Manipulator',
    description: 'Anthony Reid, also known as Four of Swords, is a former soldier from West Midseashire who became an information broker and a discreet member of the mystical underworld. As a Sequence 4 Manipulator of the Visionary Pathway, he excels at subtle influence rather than open confrontation. Outwardly ordinary—light blond hair, medium build, and an unassuming presence—he hides sharp intelligence and a calculating mind. Anthony is pragmatic, secretive, and loyal only to his own survival. Within the Tarot Club, his calm demeanor and insight make him an indispensable yet enigmatic ally, a man who thrives in the shadows of knowledge and deception.',
    image: 'Anthony Reid.webp'
  },
  {
    name: 'Azik Eggers',
    aliases: ['Death Consul'],
    category: 'Relevant Characters',
    age: '1300',
    height: '175cm',
    pathway: 'Death',
    sequence: 'Sequence 2 - Death Consul',
    description: 'Azik Eggers is one of the most complex Beyonders in Lord of the Mysteries. Over 1,300 years old, he once ruled as emperor of the Balam Empire and is the son of Death (Salinger). He now serves as the Death Consul on the Death Pathway at Sequence 2, though much of his life is shaped by memory loss caused by a fragmented soul. His mortal guise is of a gentle, kind man, professor-turned-mystery figure, average height, bronze skin, dark hair, and a thoughtful, deeply weary presence. Having lived through epochal wars, he knows betrayal, duty, and the weight of divine expectation. Even when stripped of most memories, he rarely acts without purpose.',
    image: 'Official-Azik-crop.webp'
  },
  {
    name: 'Daly Simone',
    aliases: ['Spirit Medium'],
    category: 'Relevant Characters',
    age: '27',
    height: '168cm',
    pathway: 'Sleepless',
    sequence: 'Sequence 5 - Gatekeeper',
    description: 'Daly Simone began as a promising Spirit Medium in Awwa County, part of the Death Pathway. At 19, following a family tragedy, she accidentally swallowed a potion and became a Corpse Collector, then rapidly advanced. She’s hailed as a genius for reaching Sequence 7, Spirit Medium, in just two years—without prior knowledge of the “acting method.” Later, however, she is recorded as Sequence 5, Gatekeeper, suggesting setbacks or changes. Daly acts as a Nighthawk (Church of Evernight) and gets transferred between dioceses due to her potential. She’s deeply idealistic, haunted by loss, loyal to Dunn Smith, and willing to pay high costs to protect those she cares about. She dies in a confrontation, preserving her dignity.',
    image: 'Daly_Simone_Official.webp'
  },
  {
    name: 'Franca Roland',
    aliases: ['The Empress', 'Two of Cups'],
    category: 'Tarot Club Members',
    age: '30',
    height: '171cm',
    pathway: 'Assassin',
    sequence: 'Sequence 2 - Demoness of Catastrophe',
    description: 'Franca Roland is a Transmigrator from modern-era China who became a Beyonder of the Demoness Pathway. Initially male, she transitioned into a female Witch after consuming the Sequence 7 Witch potion, unaware of the gender change. She rapidly advanced through the Sequences, reaching Sequence 2 – Catastrophe – in a short period. Franca is known for her enigmatic presence and powerful abilities, including the manipulation of diseases and plagues. She was a member of the Tarot Club, holding the codename The Empress, and previously served under the Judgement and Chariot cards as Two of Cups. Her honorific titles reflect her formidable nature and complex character.',
    image: 'Franca Roland.webp'
  },
  {
    name: 'Celia Bello',
    aliases: ['Jenna', 'Seven of Cups'],
    category: 'Relevant Characters',
    age: '21',
    height: '167cm',
    pathway: 'Assassin',
    sequence: 'Sequence 3 - Demoness of Unaging',
    description: 'Jenna Roland, born Celia Bello, is a rare female Beyonder of the Demoness Pathway. Initially known for her performances as a chanteuse, she later becomes a Minor Arcana of the Tarot Club under the codename Seven of Cups, serving under The Chariot card. Her rapid advancement through the Sequences is notable, reaching Sequence 3 – Angel – in a short period. Jenna is characterized by her loyalty to those she cares about and her willingness to go to great lengths to protect them. Her contracted messenger, Chasel Sávio, aids her in her endeavors.',
    image: 'Celia Bello.webp'
  },
  {
    name: 'Lumian Lee',
    aliases: ['The Chariot', 'Seven Of Wands'],
    category: 'Tarot Club Members',
    age: '23',
    height: '180cm',
    pathway: 'Hunter',
    sequence: 'Sequence 0 - Red Priest',
    description: 'Lumian Lee is a charismatic and determined young man from Hornacis in Intis. Transformed into a mantis-like spiritual entity, he embarks on a path of vengeance and power. Advancing through multiple Beyonder pathways, including Red Priest and Eternal Aeon, he attains extraordinary abilities but at great physical and spiritual cost. His quest for strength leads him to merge powers from different pathways, facing profound moral and existential challenges along the way. Lumian’s journey explores themes of identity, sacrifice, and the pursuit of meaning in a world steeped in mystery, danger, and supernatural intrigue',
    image: 'Lumian Lee.webp'
  },
  {
    name: 'Will Auceptin',
    aliases: ['Angel of Mercury'],
    category: 'Relevant Characters',
    age: 'Fourth Epoch',
    height: '140cm',
    pathway: 'Wheel of Fortune',
    sequence: 'Sequence 1 - Snake of Mercury',
    description: 'Will Auceptin, originally born in the Fourth Epoch, was reincarnated as Will Ceres in the Fifth Epoch to evade a prophecy foretelling his demise at the hands of Ouroboros. Despite his youthful appearance, he possesses immense power as a Sequence 1 Beyonder of the Wheel of Fortune pathway, known as the Snake of Mercury. He serves as the Angel of Mercury under The Fool, embodying fate and fortune. Will is instrumental in guiding and aiding Klein Moretti, offering cryptic insights and interventions. His existence intertwines with the mysteries of fate, luck, and divine intervention.',
    image: 'Wil_Auceptin_Official.webp'
  },
  {
    name: 'Cattleya',
    aliases: ['The Hermit', 'Queen of Stars'],
    category: 'Tarot Club Members',
    age: '56',
    height: '175cm',
    pathway: 'Mystery Pryer',
    sequence: 'Sequence 2 - Sage',
    description: 'Cattleya, known as The Hermit within the Tarot Club, is a seasoned and astute Beyonder of the Mystery Pryer pathway. Once a formidable pirate admiral leading "The Stars" with her flagship "The Future," she later ascended to the title of Queen of Stars. Her journey led her to the Moses Ascetic Order, where she grappled with the influence of the Unorthodox God "Hidden Sage." Rescued by Klein Moretti, she became a pivotal member of the Tarot Club, offering invaluable insights and guidance. By the series end, she stands as a Sequence 2 Sage, embodying wisdom and strength.',
    image: 'Cattleya_Official.webp'
  },
  {
    name: 'Fors Wall',
    aliases: ['The Magician'],
    category: 'Tarot Club Members',
    age: '32',
    height: '165cm',
    pathway: 'Door',
    sequence: 'Sequence 1 - Key of Stars',
    description: 'Fors Wall, originally a clinical doctor and aspiring novelist, became a member of the Tarot Club under the codename "The Magician." She is a Sequence 1 Beyonder of the Door pathway, known as the Key of Stars, and serves as the Angel of Stars under The Fool. Fors is a bestselling author, known for her pen name Margaret Taylor, and has a close friendship with Xio Derecha. She is also a disciple of Dorian Gray Abraham, a member of the Abraham Family. Fors honorific name is Cosmic Traveler, Beholden to the King of Yellow and Black, The Sorcerer chronicling the World, which carries the power to conceal secrets from others.',
    image: 'Fors_Wall_Official.webp'
  },
  {
    name: 'Sharron',
    aliases: ['Temperance'],
    category: 'Tarot Club Members',
    age: '33',
    height: '168cm',
    pathway: 'Chained',
    sequence: 'Sequence 2 - Ancient Bane',
    description: 'Sharron is a former member of the Rose School of Thought who fled due to philosophical conflicts and settled in Backlund. Initially hired by Klein Moretti as a bodyguard, she later became a member of the Tarot Club under the codename Temperance. A Beyonder of the Chained pathway, she believes in temperance and suppressing desires, in contrast to the Rose Schools Indulgence Faction. She is also a follower of the Church of the Fool and was honored as a Saint. Sharron is known for her calm demeanor and often communicates through companions, rarely appearing in person.',
    image: 'Sharron_Cropped_Official.webp'
  },
  {
    name: 'Xio Derecha',
    aliases: ['Judgment'],
    category: 'Tarot Club Members',
    age: '32',
    height: '152cm',
    pathway: 'Arbiter',
    sequence: 'Sequence 2 - Balancer',
    description: 'Xio Derecha, known by her codename Judgment, is a dedicated and principled individual from East Tucker County, Loen Kingdom. Standing at 1.52 meters, she is notably shorter than most, which contrasts with her commanding presence. Initially a bounty hunter, she later served as a colonel and deputy director of MI9, Loens internal security and anti-espionage agency. Her commitment to justice and order led her to become a Sequence 2 Balancer, embodying the concept of judgment. Xio is a member of the Tarot Club, where she is known by the codename Judgment. She is also a follower of the Church of the Fool.',
    image: 'Xio_Derecha_Official.webp'
  },
  {
    name: 'Adam',
    aliases: ['Angel of Imagination'],
    category: 'Relevant Characters',
    age: 'Third Epoch',
    height: 'Unknown',
    pathway: 'Spectator',
    sequence: 'Sequence 0 - Visionary',
    description: 'Adam, originally known as Grisha, is a central figure in Lord of the Mysteries. Born in the Third Epoch, he was one of the Kings of Angels under the Ancient Sun God. Initially a Sequence 1 Author with the Visionary pathway, Adam advanced to Sequence 0 by acquiring all necessary Beyonder characteristics. He led the Twilight Hermit Order, aiming to revive the Ancient Sun God. Upon the Ancient Sun Gods death, Adam fused with the True Creator, becoming the current True Creator. His abilities include manipulating imagination, controlling minds, and altering reality.',
    image: 'AC_Adam_fr.webp'
  },
  {
    name: 'Medici',
    aliases: ['Red Angel'],
    category: 'Villains',
    age: '1300',
    height: '179cm',
    pathway: 'Red Priest',
    sequence: 'Sequence 1 - Conqueror',
    description: 'Medici, known as the Red Angel and War Angel, was one of the eight Kings of Angels serving the Ancient Sun God. He was a Sequence 1 Beyonder of the Red Priest pathway, embodying the Conqueror sequence. Medici played a significant role in the Fourth Epoch as the leader of the Red of War Army within the Solomon Empire. His death occurred during an ambush by Alista Tudor, the Blood Emperor, who sought to ascend to Sequence 0 of the Red Priest pathway. Following his demise, Medicis remnant spirit fused with those of Sauron and Einhorn, forming the Evil Spirit known as Sauron-Einhorn-Medici. This entity continues to exist, with Medicis consciousness often acting as the primary one.',
    image: 'Medici.webp'
  },
  {
    name: 'Ouroboros',
    aliases: ['Angel of Fate'],
    category: 'Villains',
    age: '2500',
    height: '179cm',
    pathway: 'Wheel of Fortune',
    sequence: 'Sequence 1 - Snake of Mercury',
    description: 'Ouroboros, known as the Angel of Fate, was one of the Kings of Angels under the Ancient Sun God. He was a Sequence 1 Beyonder of the Wheel of Fortune pathway, embodying the Snake of Mercury sequence. Ouroboros had been a follower of the Ancient Sun God since he was just a Saint. He later joined Rose Redemption, which eventually caused the fall of the Ancient Sun God. After the fall of the Ancient Sun God and the departure of the other Kings of Angels, Ouroboros became the leader of Rose Redemption, and together with Medici, they have been following the True Creator ever since. According to Will Auceptin, every time Ouroboros is reborn, he grows up by the side of the True Creator. He also must start over from a "Snake Egg", slowly grow back up, and eventually grow back into his former form.',
    image: 'Ouroboros_Official.webp'
  },
  {
    name: 'Circle of Inevitability',
    aliases: ['The Eternal Cycle'],
    category: 'Outer Gods',
    age: 'Ancient',
    height: 'Unknown',
    pathway: 'Image Eternal Aeon',
    sequence: 'Above the Sequence - Circle of Inevitability ',
    description: 'The Circle of Inevitability is an Outer Deity symbolizing the inescapable cycle of fate and time. Born from the union of the Original Creator and the Mother Goddess of Depravity, it embodies the interconnectedness of cause, effect, and process across all dimensions. Unlike other Outer Deities, the Circle of Inevitability possesses a unique inclination towards redemption, often intervening to guide events toward predestined outcomes. Its true form consists of three interconnected bodies representing different aspects of fate. The Circle of Inevitability plays a significant role in the cosmic balance, influencing events and destinies across the universe.',
    image: 'Circle_of_Inevitability_Official_Art.webp'
  },
  {
    name: 'Primordial Hunger',
    aliases: ['Devouring Whirlpool'],
    category: 'Outer Gods',
    age: 'Ancient',
    height: 'Unknown',
    pathway: 'Image Tail Devourer',
    sequence: 'Above the Sequence - Primordial Hunger',
    description: 'Primordial Hunger is an Outer Deity symbolizing the instinct of convergence and devouring. Born from the union of the Original Creator and the Mother Goddess of Depravity, it embodies the primal urge to consume and assimilate. Unlike other Outer Deities, Primordial Hunger is driven by an insatiable desire to devour, leading to a loss of rationality and a focus on self-preservation. It possesses the authority over the Image Tail-Devourer Pathway, granting it powers related to devouring, convergence, and hunger. Its ultimate goal is to consume the Chaos Primogenitor, which could lead to the return of the Original Creator.',
    image: 'Primordial_Hunger_Official_Art.webp'
  },
  {
    name: 'Mother Tree of Desire',
    aliases: ['Father of Devils'],
    category: 'Outer Gods',
    age: 'Ancient',
    height: 'Unknown',
    pathway: 'Image Patriarch',
    sequence: 'Above the Sequence - Mother Tree of Desire',
    description: 'The Mother Tree of Desire from Lord of the Mysteries is a colossal, ancient entity embodying corruption, lust, and chaotic vitality. Rooted in the spiritual realm, it manifests as a twisted, pulsating tree with countless writhing branches and obscene fruits symbolizing temptation and excess. Its presence distorts reality, spreading madness and perverse cravings to all who approach. A remnant of the Primordial One’s chaos, it represents the unrestrained hunger of existence itself—life devouring life to perpetuate itself. Worshippers see it as a source of forbidden power, while to others it is a blight—an unholy fusion of fertility and decay.',
    image: 'Mother_Tree_of_Desire_Official_Art.webp'
  },
  {
    name: 'Mother Goddess of Depravity',
    aliases: ['Primordial Moon'],
    category: 'Outer Gods',
    age: 'Ancient',
    height: 'Unknown',
    pathway: 'Image Chaos Primogenitor',
    sequence: 'Above the Sequence - Mother Goddess of Depravity',
    description: 'The Mother Goddess of Depravity is an Outer Deity symbolizing the origin of evil and the physical world. She is the first child of the Original Creator, alongside the Mother Tree of Desire and the Son of Chaos. She was the original owner of the Image Mother and Image Moon Pathways and is currently the owner of the Image Chaos Primogenitor Pathway. Her influence has grown significantly, with worshippers in the Rose School of Thought and other evil organizations. She participated in Project Vortex, leading to the birth of Tirié. During the battle against Earths Above the Sequence and Outer Deities, she was severely wounded and has since gone into hiding to recover.',
    image: 'Mother_Goddess_of_Depravity_Official_Art.webp'
  }
]

const characters = rawCharacters.map(character => ({
  ...character,
  slug: slugify(character.name),
  image: character.image || null
}))

module.exports = characters
