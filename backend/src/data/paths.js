const slugify = require('../utils/slugify')

const basePaths = [
  {
    name: 'Seer',
    type: 'standard',
    description: 'Focused on foresight, divination, and fate manipulation. Beyonders on this path gain abilities related to prophecy, clairvoyance, and destiny interference, often at the cost of mental stability and exposure to incomprehensible knowledge.',
    image: 'Fool_Symbol2.webp',
    domains: ['Fate', 'Knowledge', 'Mystery'],
    sequences: [
      { level: 9, name: 'Seer' },
      { level: 8, name: 'Clown' },
      { level: 7, name: 'Magician' },
      { level: 6, name: 'Faceless' },
      { level: 5, name: 'Nimblewright Master' },
      { level: 4, name: 'Bizarro Sorcerer' },
      { level: 3, name: 'Scholar of Yore' },
      { level: 2, name: 'Miracle Invoker' },
      { level: 1, name: 'Attendant of Mysteries' },
      { level: 0, name: 'Fool' }
    ]
  },
  {
    name: 'Apprentice',
    type: 'standard',
    description: 'The pathway of scholars and explorers of the mystical world. It focuses on learning, understanding supernatural phenomena, and adapting foreign Beyonder powers for one’s own use. Higher sequences gain abilities to traverse worlds and manipulate dimensions.',
    image: 'Door_Symbol2.webp',
    domains: ['Knowledge', 'Learning', 'Space'],
    sequences: [
      { level: 9, name: 'Apprentice' },
      { level: 8, name: 'Trickmaster' },
      { level: 7, name: 'Astrologer' },
      { level: 6, name: 'Scribe' },
      { level: 5, name: 'Traveler' },
      { level: 4, name: 'Secrets Sorcerer' },
      { level: 3, name: 'Wanderer' },
      { level: 2, name: 'Planeswalker' },
      { level: 1, name: 'Key of Light' },
      { level: 0, name: 'Door' }
    ]
  },
  {
    name: 'Marauder',
    type: 'standard',
    description: 'The pathway of plunderers and usurpers. Beyonders here specialize in stealing or copying the abilities, items, or characteristics of others, eventually reaching the point of seizing fate and authority themselves. It’s a path of domination through theft.',
    image: 'Error_Symbol2.webp',
    domains: ['Plunder', 'Authority', 'Control'],
    sequences: [
      { level: 9, name: 'Marauder' },
      { level: 8, name: 'Swindler' },
      { level: 7, name: 'Cryptologist' },
      { level: 6, name: 'Promotheus' },
      { level: 5, name: 'Dream Stealer' },
      { level: 4, name: 'Parasite' },
      { level: 3, name: 'Mentor of Deceit' },
      { level: 2, name: 'Trojan Horse of Destiny' },
      { level: 1, name: 'Worm of Time' },
      { level: 0, name: 'Error' }
    ]
  },
  {
    name: 'Spectator',
    type: 'standard',
    description: 'The pathway of observers and manipulators of the mind. Beyonders here excel at reading emotions, predicting behavior, and subtly influencing others through psychology and observation. At higher sequences, they can control minds and even rewrite personalities.',
    image: 'Visionary_Symbol2.webp',
    domains: ['Emotion', 'Mind', 'Observation'],
    sequences: [
      { level: 9, name: 'Spectator' },
      { level: 8, name: 'Telepathist' },
      { level: 7, name: 'Psychiatrist' },
      { level: 6, name: 'Hypnotist' },
      { level: 5, name: 'Dreamwalker' },
      { level: 4, name: 'Manipulator' },
      { level: 3, name: 'Dream Weaver' },
      { level: 2, name: 'Discerner' },
      { level: 1, name: 'Author' },
      { level: 0, name: 'Visionary' }
    ]
  },
  {
    name: 'Bard',
    type: 'standard',
    description: 'The Pathway of Righteousness and Morality. Beyonders here uphold justice, inspire virtue, and act as moral exemplars or spiritual guides. Their power stems from conviction, faith, and moral clarity, often manifesting as charisma, inspiration, or holy authority. At higher sequences, they can embody or enforce moral laws themselves.',
    image: 'Sun_Symbol2.webp',
    domains: ['Righteousness', 'Faith', 'Inspiration'],
    sequences: [
      { level: 9, name: 'Bard' },
      { level: 8, name: 'Light Suppliant' },
      { level: 7, name: 'Solar High Priest' },
      { level: 6, name: 'Notary' },
      { level: 5, name: 'Priest of Light' },
      { level: 4, name: 'Unshadowed' },
      { level: 3, name: 'Justice Mentor' },
      { level: 2, name: 'Lightseeker' },
      { level: 1, name: 'White Angel' },
      { level: 0, name: 'Sun' }
    ]
  },
  {
    name: 'Sailor',
    type: 'standard',
    description: 'The pathway of explorers, voyagers, and storm tamers. Beyonders on this path command the sea, wind, and weather, becoming increasingly attuned to the vastness and chaos of the oceans. Higher sequences can control storms, navigate any environment, and even embody the sea’s will itself.',
    image: 'Tyrant_Symbol2.webp',
    domains: ['Storm', 'Freedom', 'Exploration'],
    sequences: [
      { level: 9, name: 'Sailor' },
      { level: 8, name: 'Folk of Rage' },
      { level: 7, name: 'Seafarer' },
      { level: 6, name: 'Wind Blessed' },
      { level: 5, name: 'Ocean Songster' },
      { level: 4, name: 'Cataclysm Interrer' },
      { level: 3, name: 'Sea King' },
      { level: 2, name: 'Calamity' },
      { level: 1, name: 'Thunder God' },
      { level: 0, name: 'Tyrant' }
    ]
  },
  {
    name: 'Reader',
    type: 'standard',
    description: 'The pathway of knowledge accumulation and memory mastery. Beyonders here can absorb, analyze, and utilize information at supernatural speed. Higher sequences gain abilities to access the memories of others, manipulate texts, and even perceive hidden truths in the world.',
    image: 'White_Tower_Symbol2.webp',
    domains: ['Knowledge', 'Memeory', 'Analysis'],
    sequences: [
      { level: 9, name: 'Reader' },
      { level: 8, name: 'Student of Ratiocination' },
      { level: 7, name: 'Detective' },
      { level: 6, name: 'Polymath' },
      { level: 5, name: 'Mysticism Magister' },
      { level: 4, name: 'Prophet' },
      { level: 3, name: 'Cognizer' },
      { level: 2, name: 'Wisdom Angel' },
      { level: 1, name: 'Ominiscent Eye' },
      { level: 0, name: 'White Tower' }
    ]
  },
  {
    name: 'Secrets Suppliant',
    type: 'standard',
    description: 'The pathway of mystery seekers and supplicants of hidden truths. Beyonders here are drawn to uncover forbidden knowledge, occult secrets, and the unknown, often at great personal risk. Higher sequences allow direct interaction with mystical forces or entities behind the veil of reality.',
    image: 'Hanged_Man_Symbol2.webp',
    domains: ['Mystery', 'Knowledge', 'Occult'],
    sequences: [
      { level: 9, name: 'Secrets Suppliant' },
      { level: 8, name: 'Listener' },
      { level: 7, name: 'Shadow Ascetic' },
      { level: 6, name: 'Rose Bishop' },
      { level: 5, name: 'Shepherd' },
      { level: 4, name: 'Black Knight' },
      { level: 3, name: 'Trinity Templar' },
      { level: 2, name: 'Profane Presbyter' },
      { level: 1, name: 'Dark Angel' },
      { level: 0, name: 'Hanged Man' }
    ]
  },
  {
    name: 'Sleepless',
    type: 'standard',
    description: 'The pathway of night watchers and spiritual observers. Beyonders on this path gain powers tied to darkness, dreams, and spiritual perception. As they advance, they can manipulate sleep, influence nightmares, and interact with spiritual entities.',
    image: 'Darkness_Symbol2.webp',
    domains: ['Darkness', 'Dreams', 'Misfortune'],
    sequences: [
      { level: 9, name: 'Sleepless' },
      { level: 8, name: 'Midnight Poet' },
      { level: 7, name: 'Nightmare' },
      { level: 6, name: 'Soul Assurer' },
      { level: 5, name: 'Spirit Warlock' },
      { level: 4, name: 'Nighwathcer' },
      { level: 3, name: 'Horror Bishop' },
      { level: 2, name: 'Servant of Concealment' },
      { level: 1, name: 'Knight of Misfortune' },
      { level: 0, name: 'Darkness' }
    ]
  },
  {
    name: 'Corpse Collector',
    type: 'standard',
    description: 'The pathway of death and decay manipulators. Beyonders on this path focus on controlling corpses, extracting life energy, and interacting with the dead. At higher sequences, they can command the dead, drain life from the living, or even manipulate death itself.',
    image: 'Death_Symbol2.webp',
    domains: ['Death', 'Life Drain', 'Decay'],
    sequences: [
      { level: 9, name: 'Corpse Collector' },
      { level: 8, name: 'Gravedigger' },
      { level: 7, name: 'Spirit Medium' },
      { level: 6, name: 'Spirit Guide' },
      { level: 5, name: 'Gatekeeper' },
      { level: 4, name: 'Undying' },
      { level: 3, name: 'Ferryman' },
      { level: 2, name: 'Death Consul' },
      { level: 1, name: 'Pale Emperor' },
      { level: 0, name: 'Death' }
    ]
  },
  {
    name: 'Warrior',
    type: 'standard',
    description: 'The pathway of combat, strength, and martial skill. Beyonders on this path excel in physical prowess, weapon mastery, and battlefield strategy. At higher sequences, they can enhance their bodies supernaturally, resist injuries, and even manipulate the flow of combat.',
    image: 'Twilight_Giant_Symbol2.webp',
    domains: ['Combat', 'Endurance', 'Strategy'],
    sequences: [
      { level: 9, name: 'Warrior' },
      { level: 8, name: 'Pugilist' },
      { level: 7, name: 'Weapon Master' },
      { level: 6, name: 'Dawn Paladin' },
      { level: 5, name: 'Guardian' },
      { level: 4, name: 'Demon Hunter' },
      { level: 3, name: 'Silver Knight' },
      { level: 2, name: 'Glory' },
      { level: 1, name: 'Hand of God' },
      { level: 0, name: 'Twilight Giant' }
    ]
  },
  {
    name: 'Assassin',
    type: 'standard',
    description: 'The Assassin Pathway is a transformative journey that begins with mastering the art of killing and culminates in transcending humanity to become the Demoness, an entity embodying death, chaos, and extreme lethality.',
    image: 'Demoness_Symbol2.webp',
    domains: ['Mirrors', 'Shadows', 'Transformation'],
    sequences: [
      { level: 9, name: 'Assassin' },
      { level: 8, name: 'Instigator' },
      { level: 7, name: 'Witch' },
      { level: 6, name: 'Pleasure' },
      { level: 5, name: 'Affliction' },
      { level: 4, name: 'Despair' },
      { level: 3, name: 'Unaging' },
      { level: 2, name: 'Catastrophe' },
      { level: 1, name: 'Apocalypse' },
      { level: 0, name: 'Primordial Demoness' }
    ]
  },
  {
    name: 'Hunter',
    type: 'standard',
    description: 'Beyonders on this path gain abilities related to combat, fire manipulation, and physical enhancement. At higher sequences, they can control weather, manipulate steel, and lead armies.',
    image: 'Red_Priest_Symbol2.webp',
    domains: ['War', 'Fire', 'Strenght'],
    sequences: [
      { level: 9, name: 'Hunter' },
      { level: 8, name: 'Provoker' },
      { level: 7, name: 'Pyromaniac' },
      { level: 6, name: 'Conpirer' },
      { level: 5, name: 'Reaoer' },
      { level: 4, name: 'Iron Blooded Knight' },
      { level: 3, name: 'War Bishop' },
      { level: 2, name: 'Weather Warlock' },
      { level: 1, name: 'Conqueror' },
      { level: 0, name: 'Red Priest' }
    ]
  },
  {
    name: 'Mystery Pryer',
    type: 'standard',
    description: 'The Mystery Pryer pathway is centered on the pursuit and mastery of knowledge, particularly the mystical and occult. Beyonders on this path develop abilities related to divination, ritual magic, and spiritual perception. At higher sequences, they can manipulate symbols, recreate myths, and even transform into information itself.',
    image: 'Hermit_Symbol2.webp',
    domains: ['Knowledge', 'Mysticism', 'Riual Magic'],
    sequences: [
      { level: 9, name: 'Mystery Pryer' },
      { level: 8, name: 'Melee Scholar' },
      { level: 7, name: 'Warlock' },
      { level: 6, name: 'Scrolls Professor' },
      { level: 5, name: 'Constellation Master' },
      { level: 4, name: 'Mysticologist' },
      { level: 3, name: 'Clairvoyant' },
      { level: 2, name: 'Sage' },
      { level: 1, name: 'Knowledge Emperor' },
      { level: 0, name: 'Hermit' }
    ]
  },
  {
    name: 'Savant',
    type: 'standard',
    description: 'The Savant Pathway focuses on mastering scientific knowledge, enhancing memory, intelligence, and logical reasoning abilities. Unlike many other pathways, it doesnt involve high spirituality or attract disasters, making it relatively safe for daily life.',
    image: 'Paragon_Symbol2.webp',
    domains: ['Knowledge', 'Mechanics', 'Craftmaship'],
    sequences: [
      { level: 9, name: 'Savant' },
      { level: 8, name: 'Archeologist' },
      { level: 7, name: 'Appraiser' },
      { level: 6, name: 'Artisan' },
      { level: 5, name: 'Astronomer' },
      { level: 4, name: 'Alchemist' },
      { level: 3, name: 'Arcane Scolar' },
      { level: 2, name: 'Knowledge Magister' },
      { level: 1, name: 'Illuminator' },
      { level: 0, name: 'Paragon' }
    ]
  },
  {
    name: 'Monster',
    type: 'standard',
    description: 'The Monster Pathway is associated with fate, luck, and chaos. Beyonders on this path gain abilities related to manipulating probability, sensing danger, and foreseeing the future. At higher sequences, they can control luck, cause misfortune, and even manipulate the fate of others.',
    image: 'Wheel_of_Fortune_Symbol2.webp',
    domains: ['Luck', 'Fate', 'Probability'],
    sequences: [
      { level: 9, name: 'Monster' },
      { level: 8, name: 'Robot' },
      { level: 7, name: 'Lucky One' },
      { level: 6, name: 'Calamity Priest' },
      { level: 5, name: 'Winner' },
      { level: 4, name: 'Missfortune Mage' },
      { level: 3, name: 'Chaoswalker' },
      { level: 2, name: 'Shoothsayer' },
      { level: 1, name: 'Snake of Mercury' },
      { level: 0, name: 'Wheel of Fortune' }
    ]
  },
  {
    name: 'Planter',
    type: 'standard',
    description: 'The Planter Pathway is centered on nurturing life, particularly plants and nature. Beyonders on this path develop abilities related to agriculture, plant manipulation, and environmental harmony. At higher sequences, they can influence ecosystems, heal living beings, and embody aspects of nature itself.',
    image: 'Mother_Symbol2.webp',
    domains: ['Life', 'Nature', 'Healing'],
    sequences: [
      { level: 9, name: 'Planter' },
      { level: 8, name: 'Doctor' },
      { level: 7, name: 'Harvest Priest' },
      { level: 6, name: 'Biologist' },
      { level: 5, name: 'Druid' },
      { level: 4, name: 'Classical Alchemist' },
      { level: 3, name: 'Pallbearer' },
      { level: 2, name: 'Desolate Matriarch' },
      { level: 1, name: 'Nature Walker' },
      { level: 0, name: 'Mother' }
    ]
  },
  {
    name: 'Apothecary',
    type: 'standard',
    description: 'The Apothecary Pathway focuses on the creation and application of potions and medicinal concoctions. Beyonders on this path develop abilities related to alchemy, healing, and enhancing physical and spiritual well-being. At higher sequences, they can manipulate life forces, create powerful elixirs, and influence the spiritual realm.',
    image: 'Moon_Symbol2.webp',
    domains: ['Alchemy', 'Life Force', 'Spirituality'],
    sequences: [
      { level: 9, name: 'Apothecary' },
      { level: 8, name: 'Beast Tamer' },
      { level: 7, name: 'Vampire' },
      { level: 6, name: 'Potion Professor' },
      { level: 5, name: 'Scarlet Scholar' },
      { level: 4, name: 'Shaman King' },
      { level: 3, name: 'High Summoner' },
      { level: 2, name: 'Life-Giver' },
      { level: 1, name: 'Beauty Goddess' },
      { level: 0, name: 'Moon' }
    ]
  },
  {
    name: 'Criminal',
    type: 'standard',
    description: 'The Criminal Pathway is centered on indulging in ones basest desires and embracing a life of crime and chaos. Beyonders on this path gain abilities that enhance their physical prowess and criminal expertise, allowing them to commit heinous acts without remorse.',
    image: 'Abyss_Symbol2.webp',
    domains: ['Crime', 'Chaos', 'Physical Enhancement'],
    sequences: [
      { level: 9, name: 'Criminal' },
      { level: 8, name: 'Unwinged Angel' },
      { level: 7, name: 'Serial Killer' },
      { level: 6, name: 'Devil' },
      { level: 5, name: 'Desire Apostle' },
      { level: 4, name: 'Demon' },
      { level: 3, name: 'Blather' },
      { level: 2, name: 'Bloody Archduke' },
      { level: 1, name: 'Filthy Monarch' },
      { level: 0, name: 'Abyss' }
    ]
  },
  {
    name: 'Prisoner',
    type: 'standard',
    description: 'The Prisoner Pathway, revolves around the themes of restraint, repression, and the yearning for freedom. Beyonders on this path gain abilities that reflect their internal struggles and desires for liberation.',
    image: 'Chained_Symbol2.webp',
    domains: ['Restraint', 'Freedom', 'Internal Struggle'],
    sequences: [
      { level: 9, name: 'Prisoner' },
      { level: 8, name: 'Lunatic' },
      { level: 7, name: 'Werewolf' },
      { level: 6, name: 'Zombie' },
      { level: 5, name: 'Wraith' },
      { level: 4, name: 'Puppet' },
      { level: 3, name: 'Disciple of Silence' },
      { level: 2, name: 'Ancient Bane' },
      { level: 1, name: 'Abomination' },
      { level: 0, name: 'Chained' }
    ]
  },
  {
    name: 'Lawyer',
    type: 'standard',
    description: 'The Lawyer pathway is centered on exploiting loopholes in laws and systems. Beyonders on this path develop abilities related to persuasion, manipulation, and understanding of legal frameworks.',
    image: 'Black_Emperor_Symbol2.webp',
    domains: ['Law', 'Manipulation', 'Persuasion'],
    sequences: [
      { level: 9, name: 'Lawyer' },
      { level: 8, name: 'Barbarian' },
      { level: 7, name: 'Briber' },
      { level: 6, name: 'Baron of Corruption' },
      { level: 5, name: 'Mentor of Disorder' },
      { level: 4, name: 'Earl of the Fallen' },
      { level: 3, name: 'Frenzied Mage' },
      { level: 2, name: 'Duke of Entropy' },
      { level: 1, name: 'Prince of Abolition' },
      { level: 0, name: 'Black Emperor' }
    ]
  },
  {
    name: 'Arbiter',
    type: 'standard',
    description: 'The Arbiter pathway focuses on enforcing order, authority, and justice. Beyonders on this path develop abilities related to persuasion, manipulation, and understanding of legal frameworks.',
    image: 'Justiciar_Symbol2.webp',
    domains: ['Law', 'Manipulation', 'Order'],
    sequences: [
      { level: 9, name: 'Arbiter' },
      { level: 8, name: 'Sheriff' },
      { level: 7, name: 'Interrogator' },
      { level: 6, name: 'Judge' },
      { level: 5, name: 'Disciplinary Paladin' },
      { level: 4, name: 'Imperative Mage' },
      { level: 3, name: 'Chaos Hunter' },
      { level: 2, name: 'Balancer' },
      { level: 1, name: 'Hand of Order' },
      { level: 0, name: 'Justiciar' }
    ]
  },
  {
    name: 'Dancer',
    type: 'boon',
    description: 'The Dancer Pathway is a Non-Standard Beyonder Pathway whose powers are gained primarily through ritualistic dances and spells that channel the Outer Deity, the Circle of Inevitability.',
    image: 'Sacred_Emblem_-_Circle_of_Inevitability.webp',
    domains: ['Fate', 'Time', 'Contracts'],
    sequences: [
      { level: 9, name: 'Dancer' },
      { level: 8, name: 'Alms Monk' },
      { level: 7, name: 'Conctractee' },
      { level: 6, name: 'Ascetic' },
      { level: 5, name: 'Fate Appropriator' },
      { level: 4, name: 'Circle Inhabitant' },
      { level: 3, name: 'Sufferer' },
      { level: 2, name: 'Sinner' },
      { level: 1, name: 'Angel of Redemption' },
      { level: 0, name: 'Eternal Aeon' }
    ]
  },
  {
    name: 'Villain',
    type: 'boon',
    description: 'This pathway centers on creation, life, depravity, and flesh manipulation. Beyonders gain power by controlling vitality and spawning monstrous forms, with a high risk of corruption from the Outer Deity, the Mother Goddess of Depravity.',
    image: 'MotherGoddessOfDepravity_crop.webp',
    domains: ['Life', 'Mutation', 'Depravity'],
    sequences: [
      { level: 9, name: 'Villain' },
      { level: 8, name: 'Gardner' },
      { level: 7, name: 'Heretic Spellmaster' },
      { level: 6, name: 'Sower' },
      { level: 5, name: 'Banshee' },
      { level: 4, name: 'Madame' },
      { level: 3, name: 'Divine Mother' },
      { level: 2, name: 'The Supreme' },
      { level: 1, name: 'Valley God' },
      { level: 0, name: 'Chaos Primogenitor' }
    ]
  },
  {
    name: 'Scrooge',
    type: 'boon',
    description: 'The Scrooge pathway focuses on manipulation of desires and emotions in others, along with powerful forms of imitation/impersonation.',
    image: 'Sacred_Emblem_-_Mother_Tree_of_Desire.webp',
    domains: ['Desire', 'Emotions', 'Manipulation'],
    sequences: [
      { level: 9, name: 'Scrooge' },
      { level: 8, name: 'Sex Addict' },
      { level: 7, name: 'Actor' },
      { level: 6, name: 'Recipient' },
      { level: 5, name: 'Fallen Spirit' },
      { level: 4, name: 'Tree Supplicant' },
      { level: 3, name: 'Desire Priest' },
      { level: 2, name: 'Cupid' },
      { level: 1, name: 'Leviathan' },
      { level: 0, name: 'Patriarch' }
    ]
  },
  {
    name: 'Broker',
    type: 'boon',
    description: 'The core domain of the Broker Pathway involves uncertainty, grey areas, transactions, supervision, and contracts. It is often considered a pathway that occupies the "in-between" space of the Black Emperor (distorting laws) and Justiciar (setting laws) Pathways.',
    image: 'UncertainMist_crop.webp',
    domains: ['Chaos', 'Mediation', 'Supervision'],
    sequences: [
      { level: 9, name: 'Broker' },
      { level: 8, name: 'Shadow Merchant' },
      { level: 7, name: 'Prosecutor' },
      { level: 6, name: 'Ambitionist' },
      { level: 5, name: 'Under the Table' },
      { level: 4, name: 'Overseer' },
      { level: 3, name: 'Vortex Weaver' },
      { level: 2, name: 'Blashemer' },
      { level: 1, name: 'Truth' },
      { level: 0, name: 'Chaos Mist' }
    ]
  },
  {
    name: 'Tramp',
    type: 'boon',
    description: 'This pathway revolves around consumption, digestion, adaptation, and deprivation, culminating in the power to devour not just physical matter, but abstract concepts and reality itself.',
    image: 'PrimordialHunger_crop.webp',
    domains: ['Devouring', 'Aquisition', 'Gluttony'],
    sequences: [
      { level: 9, name: 'Tramp' },
      { level: 8, name: 'Glutton' },
      { level: 7, name: 'Gourmet' },
      { level: 6, name: 'Chef' },
      { level: 5, name: 'Depriver' },
      { level: 4, name: 'Sea Monster' },
      { level: 3, name: 'Hydra' },
      { level: 2, name: 'Angel of Devouring' },
      { level: 1, name: 'Chaos Gastric Juices' },
      { level: 0, name: 'Tail Devourer' }
    ]
  },
  {
    name: 'Astonomy Affictionado',
    type: 'boon',
    description: 'This pathway is characterized by powers related to space, celestial bodies, physical forces, and high-level mysticism, often combining concepts of ancient astronomy with futuristic technology.',
    image: 'SupernovaDominator_crop.webp',
    domains: ['Cosmos', 'Physical Forces', 'Naviagation'],
    sequences: [
      { level: 9, name: 'Astronomy Affictionado' },
      { level: 8, name: 'Star Worshipper' },
      { level: 7, name: 'Star Sacrificer' },
      { level: 6, name: 'Navigator' },
      { level: 5, name: 'Tidal Scholar' },
      { level: 4, name: 'Heavybringer' },
      { level: 3, name: 'Star Shepherd' },
      { level: 2, name: 'Radiant Angel' },
      { level: 1, name: 'Star Dragon' },
      { level: 0, name: 'Condenser' }
    ]
  },
  {
    name: 'Initiator',
    type: 'boon',
    description: 'The paths core concept is about creating, defining, and projecting Philosophies, Concepts, and Rules into reality, allowing the Beyonders personal conviction and ideology to become a temporary form of law.',
    image: 'InextinguishableRavings_crop.webp',
    domains: ['Rules', 'Ideology', 'Self-Defined Power'],
    sequences: [
      { level: 9, name: 'Initiator' },
      { level: 8, name: 'Commentator' },
      { level: 7, name: 'Orator' },
      { level: 6, name: 'Singer' },
      { level: 5, name: 'Secret Trasmittant' },
      { level: 4, name: 'Philosopher' },
      { level: 3, name: 'Messanger of God' },
      { level: 2, name: 'Great Old One Attendant' },
      { level: 1, name: 'Voice of the Heart' },
      { level: 0, name: 'Everlasting' }
    ]
  },
  {
    name: 'Patient',
    type: 'boon',
    description: 'The Patient Pathway is primarily associated with the concepts of decay, corruption, and a single, devastating authority.',
    image: 'MonarchOfDecay_crop.webp',
    domains: ['Decay', 'Corruption', 'Contagion'],
    sequences: [
      { level: 9, name: 'Patient' },
      { level: 8, name: 'Secretary' },
      { level: 7, name: 'Vermin' },
      { level: 6, name: 'Deasise Envoy' },
      { level: 5, name: 'Child of Decay' },
      { level: 4, name: 'Doomed One' },
      { level: 3, name: 'Left Hand of Decay' },
      { level: 2, name: 'Time Giant' },
      { level: 1, name: 'God of Decay' },
      { level: 0, name: 'Second Law' }
    ]
  },
  {
    name: 'Shaman',
    type: 'boon',
    description: 'This pathway focuses on transforming the Beyonder into a being capable of perceiving and influencing reality from a higher dimension. It starts by playing with perception and imagination before ascending to mastery over space, time, and the very concept of truth.',
    image: 'HighDimensionalOverseer_crop.webp',
    domains: ['Truth', 'Dimension', 'Illusion'],
    sequences: [
      { level: 9, name: 'Shaman' },
      { level: 8, name: 'Reporter' },
      { level: 7, name: 'Painter' },
      { level: 6, name: 'Literary Afictionado' },
      { level: 5, name: 'Pixie' },
      { level: 4, name: 'Visitor' },
      { level: 3, name: 'String Prayer' },
      { level: 2, name: 'Dimensional Shadow' },
      { level: 1, name: 'Observer' },
      { level: 0, name: 'Subulinary Eye' }
    ]
  },
  {
    name: 'Dreamless',
    type: 'boon',
    description: 'The Dreamless Pathway focuses on transforming the Beyonder into a master of Rhythm, Music, Freedom, and Fate by listening to and manipulating the hidden, fundamental sounds of destiny. Its core theme is the liberation from illusions and the control over ones own and others fate through performance and sound.',
    image: 'GoddessOfFate_crop.webp',
    domains: ['Sound', 'Destiny', 'Fate'],
    sequences: [
      { level: 9, name: 'Dreamless' },
      { level: 8, name: 'Musician' },
      { level: 7, name: 'Fate Pryer' },
      { level: 6, name: 'Mute' },
      { level: 5, name: 'Deceased' },
      { level: 4, name: 'Fatebender' },
      { level: 3, name: 'Fate Attendant' },
      { level: 2, name: 'Web Weaver' },
      { level: 1, name: 'Blade of Fate' },
      { level: 0, name: 'Eteranal Edict' }
    ]
  }
]

const paths = basePaths.map(path => ({
  ...path,
  slug: slugify(path.name)
}))

module.exports = paths
