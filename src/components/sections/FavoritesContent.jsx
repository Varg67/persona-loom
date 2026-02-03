import React from 'react';
import { ArchiveInput } from '../ui/ArchiveInput';
import { ArchiveSelect } from '../ui/ArchiveSelect';
import { ArchiveSlider } from '../ui/ArchiveSlider';

const FavoritesContent = ({ data, updateData, subtab }) => {
  const update = (section, field, value) => {
    updateData('favorites', {
      ...data,
      [section]: {
        ...(data?.[section] || {}),
        [field]: value
      }
    });
  };

  const toggleArrayItem = (section, field, item, maxItems = 10) => {
    const current = data[section]?.[field] || [];
    if (current.includes(item)) {
      update(section, field, current.filter(i => i !== item));
    } else if (current.length < maxItems) {
      update(section, field, [...current, item]);
    }
  };

  const sections = {
    // ========== SUBTAB 0: ENTERTAINMENT ==========
    0: (
      <div className="space-y-6">
        <div className="bg-amber-50 border border-amber-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-amber-900 mb-2">🎬 ENTRETENIMENTO</h3>
          <p className="font-mono text-xs text-amber-800 leading-relaxed">Mídia consumida: música, filmes, séries, livros, games e redes sociais.</p>
        </div>

        {/* MUSIC SECTION */}
        <div className="border-2 border-purple-200 rounded-sm p-4 bg-purple-50/30">
          <h4 className="font-mono text-sm font-bold text-purple-800 mb-3">🎵 Música</h4>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Favorite Genres (up to 8)</label>
              <div className="flex flex-wrap gap-2">
                {['Rock','Classic Rock','Hard Rock','Soft Rock','Progressive Rock','Psychedelic Rock','Pop','Synth Pop','Dream Pop','Art Pop','Indie Pop','Electropop','Hip-Hop/Rap','Old School Hip-Hop','Trap','Drill','Conscious Rap','R&B/Soul','Neo-Soul','Motown','Contemporary R&B','Jazz','Smooth Jazz','Bebop','Fusion Jazz','Acid Jazz','Classical','Baroque','Romantic Era','Contemporary Classical','Opera','Chamber Music','Electronic/EDM','House','Techno','Trance','Drum & Bass','Dubstep','Hardstyle','Deep House','Chillwave','Synthwave','Vaporwave','Metal','Heavy Metal','Thrash Metal','Death Metal','Black Metal','Doom Metal','Power Metal','Nu-Metal','Metalcore','Country','Outlaw Country','Bluegrass','Americana','Country Pop','Indie','Indie Rock','Indie Folk','Post-Punk','Shoegaze','Lo-Fi Indie','Folk','Traditional Folk','Contemporary Folk','Celtic','Latin','Reggaeton','Salsa','Bachata','Cumbia','Bossa Nova','Samba','Tango','Mariachi','K-Pop','J-Pop','J-Rock','City Pop','C-Pop','Cantopop','Reggae','Dancehall','Dub','Ska','Blues','Delta Blues','Chicago Blues','Electric Blues','Punk','Hardcore Punk','Pop Punk','Emo','Post-Hardcore','Alternative','Grunge','Britpop','New Wave','Noise Rock','Gospel','Christian Rock','Worship','Spirituals','World Music','Afrobeats','Highlife','Bollywood','Flamenco','Fado','Klezmer','Lo-Fi','Lo-Fi Hip Hop','Chillhop','Ambient','Dark Ambient','New Age','Drone','Soundtrack/OST','Video Game Music','Anime OST','Film Score','Musical Theater','Experimental','Avant-Garde','Noise','Industrial','Glitch'].map(g => (
                  <button key={g} onClick={() => toggleArrayItem('entertainment', 'musicGenres', g, 8)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.entertainment?.musicGenres || []).includes(g) ? 'bg-purple-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{g}</button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Era Musical Preferida</label>
                <select value={data.entertainment?.musicEra || ''} onChange={(e) => update('entertainment', 'musicEra', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]">
                  <option value="">-- Selecione --</option>
                  <option value="classical">Classical Era (Baroque, Romantic)</option>
                  <option value="50s-60s">50s-60s (Rock and Roll, Motown)</option>
                  <option value="70s">70s (Disco, Prog Rock, Punk)</option>
                  <option value="80s">80s (Synth, New Wave, Hair Metal)</option>
                  <option value="90s">90s (Grunge, Hip-Hop Golden Age)</option>
                  <option value="2000s">2000s (Pop Punk, R&B, Early EDM)</option>
                  <option value="2010s">2010s (EDM, Trap, Streaming Era)</option>
                  <option value="current">Current (2020s)</option>
                  <option value="no-preference">No Era Preference</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Toca Instrumento?</label>
                <input type="text" value={data.entertainment?.playsInstrument || ''} onChange={(e) => update('entertainment', 'playsInstrument', e.target.value)} placeholder="Ex: Guitarra, Piano, Nenhum..." className="w-full bg-white border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]" />
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Importância da Música na Vida</label>
              <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>Background</span><span>Central</span></div>
              <input type="range" min="1" max="9" value={data.entertainment?.musicImportance || 5} onChange={(e) => update('entertainment', 'musicImportance', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-gray-300 to-purple-400 rounded-lg appearance-none cursor-pointer" />
            </div>
          </div>
        </div>

        {/* MOVIES & TV SECTION */}
        <div className="border-2 border-red-200 rounded-sm p-4 bg-red-50/30">
          <h4 className="font-mono text-sm font-bold text-red-800 mb-3">🎬 Filmes & TV</h4>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Favorite Genres (up to 8)</label>
              <div className="flex flex-wrap gap-2">
                {['Action','Martial Arts','Espionage/Spy','Heist','Comedy','Romantic Comedy','Dark Comedy','Slapstick','Parody','Satire','Stand-Up','Improv','Drama','Period Drama','Legal Drama','Medical Drama','Family Drama','Teen Drama','Melodrama','Horror','Psychological Horror','Slasher','Supernatural Horror','Body Horror','Found Footage','Cosmic Horror','Gothic Horror','Zombie','Sci-Fi','Space Opera','Dystopian','Cyberpunk','Time Travel','Post-Apocalyptic','Alien Invasion','Hard Sci-Fi','Romance','Period Romance','Contemporary Romance','LGBTQ+ Romance','Forbidden Love','Thriller','Psychological Thriller','Political Thriller','Techno-Thriller','Conspiracy','Erotic Thriller','Documentary','Nature Documentary','True Crime Doc','Historical Doc','Music Documentary','Sports Documentary','Social Issue Doc','Animation','2D Animation','3D Animation','Stop Motion','Claymation','Rotoscope','Fantasy','High Fantasy','Urban Fantasy','Dark Fantasy','Fairy Tale','Sword & Sorcery','Crime','Noir','Neo-Noir','Gangster','Police Procedural','Detective','Organized Crime','Mystery','Whodunit','Cozy Mystery','Locked Room','Amateur Sleuth','Adventure','Survival','Treasure Hunt','Expedition','Swashbuckler','War','WWII','Vietnam','Modern Warfare','Anti-War','War Drama','Western','Spaghetti Western','Neo-Western','Revisionist Western','Musical','Jukebox Musical','Original Musical','Dance Film','Opera Film','Biographical','Sports Biopic','Music Biopic','Historical Figure','Artist Biography','Superhero','MCU Style','DC Style','Anti-Hero','Origin Story','Team-Up','Anime','Shonen','Shojo','Seinen','Josei','Isekai','Mecha','Slice of Life Anime','Reality TV','Competition Reality','Dating Shows','Makeover Shows','Survival Reality','Celebrity Reality','Docu-Reality','Sitcom','Single-Camera','Multi-Camera','Workplace Sitcom','Family Sitcom','True Crime','Crime Investigation','Serial Killer','Missing Persons','Court Cases','K-Drama','Historical K-Drama','Romance K-Drama','Thriller K-Drama','Workplace K-Drama','Variety Show','Cooking Show','Travel Show','Talk Show','Game Show','Mini-Series','Limited Series','Anthology','Soap Opera','Telenovela'].map(g => (
                  <button key={g} onClick={() => toggleArrayItem('entertainment', 'movieTvGenres', g, 8)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.entertainment?.movieTvGenres || []).includes(g) ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{g}</button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Tipo Preferido</label>
                <select value={data.entertainment?.movieType || ''} onChange={(e) => update('entertainment', 'movieType', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]">
                  <option value="">-- Selecione --</option>
                  <option value="mainstream">Mainstream/Blockbusters</option>
                  <option value="indie">Independent/Arthouse</option>
                  <option value="foreign">Foreign/International</option>
                  <option value="classic">Classic/Old Hollywood</option>
                  <option value="mixed">Mixed/No Preference</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Binge-Watching Level</label>
                <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>1 ep/vez</span><span>Maratona</span></div>
                <input type="range" min="1" max="9" value={data.entertainment?.bingeLevel || 5} onChange={(e) => update('entertainment', 'bingeLevel', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-gray-300 to-red-400 rounded-lg appearance-none cursor-pointer" />
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Favorite Movies/Series</label>
              <textarea value={data.entertainment?.favoriteShows || ''} onChange={(e) => update('entertainment', 'favoriteShows', e.target.value)} placeholder="List some favorites..." className="w-full bg-white border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px] h-16 resize-none" />
            </div>
          </div>
        </div>

        {/* BOOKS SECTION */}
        <div className="border-2 border-emerald-200 rounded-sm p-4 bg-emerald-50/30">
          <h4 className="font-mono text-sm font-bold text-emerald-800 mb-3">📚 Livros & Leitura</h4>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Gêneros Literários (até 6)</label>
              <div className="flex flex-wrap gap-2">
                {['Literary Fiction','Contemporary Fiction','Experimental Fiction','Postmodern','Magical Realism','Southern Gothic','Dystopian Fiction','Utopian Fiction','Absurdist Fiction','Sci-Fi','Hard Science Fiction','Space Opera','Cyberpunk','Steampunk','Dieselpunk','Biopunk','Climate Fiction','Military Sci-Fi','First Contact','Fantasy','Epic/High Fantasy','Urban Fantasy','Dark Fantasy','Grimdark','Sword & Sorcery','Portal Fantasy','Fairy Tale Retelling','Mythological Fiction','Arthurian','Low Fantasy','Mystery/Thriller','Cozy Mystery','Police Procedural','Noir','Legal Thriller','Medical Thriller','Spy Thriller','Psychological Thriller','Techno-Thriller','Political Thriller','Domestic Thriller','Romance','Contemporary Romance','Historical Romance','Paranormal Romance','Romantic Suspense','Erotic Romance','LGBTQ+ Romance','Regency Romance','Gothic Romance','Sports Romance','Horror','Cosmic Horror','Gothic Horror','Psychological Horror','Supernatural Horror','Folk Horror','Body Horror','Splatterpunk','Quiet Horror','Historical Fiction','Ancient History','Medieval','Renaissance','Victorian','WWI/WWII','1960s-70s','Alternative History','Non-Fiction','Narrative Non-Fiction','Creative Non-Fiction','Investigative Journalism','Essay Collections','Biography/Memoir','Autobiography','Celebrity Memoir','Coming-of-Age Memoir','Travel Memoir','Family Memoir','Addiction & Recovery','Self-Help','Productivity','Relationships','Mindfulness','Financial','Career Development','Personal Growth','Philosophy','Eastern Philosophy','Western Philosophy','Ethics','Existentialism','Stoicism','Political Philosophy','History','Ancient History','Medieval History','Military History','Social History','Cultural History','Art History','Science History','Science','Popular Science','Physics','Biology','Astronomy','Neuroscience','Evolution','Climate Science','Psychology','Business','Entrepreneurship','Leadership','Marketing','Economics','Investing','Management','Poetry','Contemporary Poetry','Classical Poetry','Spoken Word','Haiku','Epic Poetry','Confessional Poetry','Graphic Novels/Comics','Superhero Comics','Manga','Indie Comics','Memoir Comics','Webcomics','Young Adult','YA Fantasy','YA Dystopian','YA Romance','YA Contemporary','YA Horror','New Adult','Classic Literature','Victorian Classics','Russian Classics','American Classics','British Classics','French Classics','Modernist Classics','Ancient Classics','Plays/Drama','Tragedy','Comedy of Manners','Absurdist Drama','Contemporary Drama','Musical Theater Scripts','True Crime Books','Cold Cases','Serial Killers','Wrongful Convictions','Organized Crime','Religious/Spiritual','Religious Fiction','Spiritual Growth','Theology','Sacred Texts','Devotional','Humor','Satire','Parody','Comedic Essays','Absurdist Humor','Academic/Scholarly','Textbooks','Research Papers','Thesis','Academic Essays','Anthologies','Short Story Collections','Flash Fiction','Novellas','Mixed Genre Collections','LitRPG/GameLit','Progression Fantasy','Wuxia/Xianxia','Cultivation','Isekai Novels'].map(g => (
                  <button key={g} onClick={() => toggleArrayItem('entertainment', 'bookGenres', g, 6)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.entertainment?.bookGenres || []).includes(g) ? 'bg-emerald-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{g}</button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Frequência de Leitura</label>
                <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>Nunca</span><span>Diário</span></div>
                <input type="range" min="1" max="9" value={data.entertainment?.readingFrequency || 5} onChange={(e) => update('entertainment', 'readingFrequency', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-gray-300 to-emerald-400 rounded-lg appearance-none cursor-pointer" />
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Formato Preferido</label>
                <select value={data.entertainment?.bookFormat || ''} onChange={(e) => update('entertainment', 'bookFormat', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]">
                  <option value="">-- Selecione --</option>
                  <option value="physical">Physical Books</option>
                  <option value="ebook">E-Books/Kindle</option>
                  <option value="audiobook">Audiobooks</option>
                  <option value="mixed">Mixed/No Preference</option>
                  <option value="none">Does Not Read</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* GAMES SECTION */}
        <div className="border-2 border-blue-200 rounded-sm p-4 bg-blue-50/30">
          <h4 className="font-mono text-sm font-bold text-blue-800 mb-3">🎮 Games</h4>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Tipos de Games (até 6)</label>
              <div className="flex flex-wrap gap-2">
                {['RPG','JRPG','Western RPG','Action RPG','Tactical RPG','MMORPG','Dungeon Crawler','Roguelike','Roguelite','FPS/Shooter','Tactical Shooter','Hero Shooter','Looter Shooter','Military Shooter','Arena Shooter','Third-Person Shooter','Action/Adventure','Open World','Metroidvania','Soulslike','Character Action','Hack and Slash','Beat Em Up','Strategy','Real-Time Strategy','Turn-Based Strategy','4X Strategy','Grand Strategy','Tower Defense','Auto Battler','City Builder','Sports','Soccer/Football','Basketball','American Football','Baseball','Hockey','Golf','Tennis','Extreme Sports','Wrestling','Boxing/MMA','Racing','Arcade Racing','Simulation Racing','Kart Racing','Combat Racing','Open World Racing','Motorcycle','Fighting','2D Fighting','3D Fighting','Platform Fighter','Tag Team','Puzzle','Match-3','Physics Puzzle','Escape Room','Point-and-Click','Hidden Object','Brain Training','Simulation','Life Simulation','Farming Simulation','Business Simulation','Flight Simulation','Driving Simulation','Social Simulation','God Games','Horror','Survival Horror','Psychological Horror','Action Horror','Cosmic Horror','MOBA','Battle Royale','Platformer','2D Platformer','3D Platformer','Precision Platformer','Collectathon','Sandbox','Survival Sandbox','Creative Sandbox','Open World Sandbox','MMO','MMORPG','Sandbox MMO','Action MMO','Visual Novel','Dating Sim','Mystery VN','Horror VN','Otome','Board Games','Classic Board Games','Euro Games','Deck Building','Worker Placement','Area Control','Cooperative','Card Games','Trading Card Games','Collectible Card Games','Deck Builders Digital','Poker/Casino','Tabletop RPG','D&D Style','Narrative TTRPG','Rules-Light','Crunchy Systems','Mobile Games','Gacha Games','Idle Games','Hyper Casual','Puzzle Mobile','Rhythm Games','Music/Rhythm','Dance Games','Instrument Games','Stealth','Tactical Stealth','Action Stealth','Social Stealth','Immersive Sim','Party Games','Trivia Games','Drawing Games','Minigame Collections','Educational','Language Learning','Math Games','History Games','Science Games','Narrative/Story','Interactive Fiction','Choice-Based','Walking Simulator','Episodic Adventure','Cozy Games','Farming Cozy','Animal Crossing Style','Relaxation Games','Crafting Focus','VR Games','VR Action','VR Simulation','VR Social','VR Horror','Indie Games','Retro/Pixel Art','Experimental Indie','Narrative Indie','Art Games','Multiplayer','Co-op','Competitive','Asymmetric','Local Multiplayer','MMO','Esports Titles','Doesn\'t Play'].map(g => (
                  <button key={g} onClick={() => toggleArrayItem('entertainment', 'gameTypes', g, 6)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.entertainment?.gameTypes || []).includes(g) ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{g}</button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-2 block">Plataformas (até 3)</label>
                <div className="flex flex-wrap gap-2">
                  {['PC','PlayStation','Xbox','Nintendo','Mobile','Tabletop'].map(p => (
                    <button key={p} onClick={() => toggleArrayItem('entertainment', 'gamePlatforms', p, 3)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.entertainment?.gamePlatforms || []).includes(p) ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{p}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Competitividade</label>
                <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>Casual</span><span>Hardcore</span></div>
                <input type="range" min="1" max="9" value={data.entertainment?.competitiveness || 5} onChange={(e) => update('entertainment', 'competitiveness', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-green-300 to-red-400 rounded-lg appearance-none cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        {/* SOCIAL MEDIA SECTION */}
        <div className="border-2 border-pink-200 rounded-sm p-4 bg-pink-50/30">
          <h4 className="font-mono text-sm font-bold text-pink-800 mb-3">📱 Redes Sociais</h4>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Plataformas Usadas (até 6)</label>
              <div className="flex flex-wrap gap-2">
                {['Instagram','TikTok','Twitter/X','Facebook','YouTube','YouTube Shorts','LinkedIn','Reddit','Discord','Snapchat','Pinterest','Twitch','BeReal','Threads','WhatsApp','Telegram','Signal','Mastodon','Bluesky','Tumblr','WeChat','Line','KakaoTalk','Viber','VK','QQ','Weibo','Xiaohongshu','Douyin','Bilibili','Nico Nico','Steam Community','Xbox Live','PlayStation Network','Nintendo Online','Letterboxd','Goodreads','Last.fm','Spotify Social','Strava','Untappd','Yelp','Nextdoor','Meetup','Clubhouse','Patreon','Substack','Medium','DeviantArt','ArtStation','Behance','Dribbble','Figma Community','GitHub','Stack Overflow','Hacker News','Product Hunt','AngelList','Glassdoor','Indeed','Quora','Wikipedia','Fandom/Wikia','4chan','8kun','Gab','Parler','Truth Social','Gettr','Rumble','Odysee','BitChute','Minds','OnlyFans','Fansly','Ko-fi','Buy Me a Coffee','Linktree','Carrd','About.me','VSCO','500px','Flickr','SmugMug','Imgur','Giphy','Tenor','SoundCloud','Bandcamp','Mixcloud','Audiomack','Deezer','Apple Music Connect','Tidal','Pandora','iHeartRadio','Stitcher','Pocket Casts','Overcast','Spotify Podcasts','Apple Podcasts','Anchor','Podbean','Dating Apps','Tinder','Bumble','Hinge','OkCupid','Match.com','eHarmony','Grindr','HER','Feeld','Gaming Social','Battle.net','Origin/EA App','Ubisoft Connect','GOG Galaxy','Epic Games','Roblox','Minecraft Realms','None/Minimal'].map(p => (
                  <button key={p} onClick={() => toggleArrayItem('entertainment', 'socialPlatforms', p, 6)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.entertainment?.socialPlatforms || []).includes(p) ? 'bg-pink-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{p}</button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Nível de Uso</label>
                <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>Non-User</span><span>Addicted</span></div>
                <input type="range" min="1" max="9" value={data.entertainment?.socialMediaUsage || 5} onChange={(e) => update('entertainment', 'socialMediaUsage', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-gray-300 to-pink-400 rounded-lg appearance-none cursor-pointer" />
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Tipo de Uso</label>
                <select value={data.entertainment?.socialMediaType || ''} onChange={(e) => update('entertainment', 'socialMediaType', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]">
                  <option value="">-- Selecione --</option>
                  <option value="lurker">Lurker — Só observa, nunca posta</option>
                  <option value="casual">Casual — Posta ocasionalmente</option>
                  <option value="active">Active — Engaja regularmente</option>
                  <option value="creator">Creator — Cria conteúdo ativamente</option>
                  <option value="influencer">Influencer — Grande audiência</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),

    // ========== SUBTAB 1: FOOD & DRINK ==========
    1: (
      <div className="space-y-6">
        <div className="bg-orange-50 border border-orange-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-orange-900 mb-2">🍽️ FOOD & DRINK</h3>
          <p className="font-mono text-xs text-orange-800 leading-relaxed">Preferências culinárias, dieta, bebidas e hábitos alimentares.</p>
        </div>

        {/* CUISINES */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🌍 Cozinhas Favoritas</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Tipos de culinária que mais gosta. Até 8.</p>
          <div className="flex flex-wrap gap-2">
            {['Italian','Northern Italian','Southern Italian','Sicilian','Tuscan','Japanese','Sushi/Sashimi','Ramen','Izakaya','Kaiseki','Teppanyaki','Yakitori','Okonomiyaki','Mexican','Tex-Mex','Oaxacan','Yucatecan','Baja Style','Taco Stand','Chinese','Cantonese','Sichuan','Hunan','Shanghainese','Beijing','Dim Sum','Hot Pot','Indian','North Indian','South Indian','Punjabi','Bengali','Goan','Hyderabadi','French','Provençal','Parisian Bistro','Haute Cuisine','Normandy','Thai','Bangkok Street Food','Northern Thai','Isaan','Southern Thai','American','Southern/Soul Food','New England','Cajun','Creole','BBQ','Midwest','Pacific Northwest','California','Hawaiian','Brazilian','Churrasco','Bahian','Mineiro','Gaúcho','Paulistano','Amazonian','Mediterranean','Spanish','Catalan','Basque','Galician','Andalusian','Tapas','Korean','Korean BBQ','Fried Chicken','Temple Food','Street Food','Vietnamese','Pho','Banh Mi','Southern Vietnamese','Central Vietnamese','Greek','Cypriot','Cretan','Spanish','Portuguese','Alentejo','Lisbon','Middle Eastern','Lebanese','Syrian','Palestinian','Jordanian','Iraqi','Gulf','Turkish','Ottoman','Anatolian','Aegean','Black Sea','Ethiopian/Eritrean','Moroccan','Tunisian','Algerian','Egyptian','West African','Nigerian','Ghanaian','Senegalese','South African','East African','Peruvian','Ceviche','Nikkei','Criollo','Andean','Caribbean','Jamaican','Cuban','Puerto Rican','Dominican','Trinidadian','Haitian','German','Bavarian','Austrian','Swiss','Belgian','Dutch','Scandinavian','Swedish','Norwegian','Danish','Finnish','Icelandic','British','English','Scottish','Welsh','Irish','Russian','Ukrainian','Polish','Czech','Hungarian','Balkan','Serbian','Croatian','Bulgarian','Romanian','Central Asian','Georgian','Armenian','Uzbek','Kazakh','Afghan','Pakistani','Bangladeshi','Sri Lankan','Nepalese','Tibetan','Malaysian','Singaporean','Indonesian','Filipino','Burmese','Cambodian','Laotian','Australian','New Zealand','Oceanian','Comfort/Home','Diner Food','Fast Food','Fast Casual','Fine Dining','Farm-to-Table','Fusion','Asian Fusion','Latin Fusion','Modern American','Contemporary','Molecular Gastronomy','Vegan Cuisine','Raw Food','Plant-Based','Kosher','Halal','Gluten-Free Focus','Allergen-Friendly','Paleo/Keto','Health Food','Organic Focus','Locavore','Street Food General','Food Truck','Pop-Up','Night Market','Hawker Center','Izakaya Style'].map(c => (
              <button key={c} onClick={() => toggleArrayItem('food', 'cuisines', c, 8)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.food?.cuisines || []).includes(c) ? 'bg-orange-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{c}</button>
            ))}
          </div>
        </div>

        {/* ADVENTUROUSNESS & RESTRICTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-sm p-4">
            <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🎲 Aventura Gastronômica</h4>
            <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>Picky Eater</span><span>Adventurous</span></div>
            <input type="range" min="1" max="9" value={data.food?.adventurousness || 5} onChange={(e) => update('food', 'adventurousness', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-yellow-300 to-green-400 rounded-lg appearance-none cursor-pointer" />
            <p className="font-mono text-[9px] text-gray-500 mt-2 text-center italic">
              {(data.food?.adventurousness || 5) <= 3 && 'Come sempre as mesmas coisas, evita novidades'}
              {(data.food?.adventurousness || 5) === 4 || (data.food?.adventurousness || 5) === 5 && 'Experimenta coisas novas às vezes'}
              {(data.food?.adventurousness || 5) >= 6 && 'Loves trying exotic and new foods'}
            </p>
          </div>

          <div className="border border-gray-200 rounded-sm p-4">
            <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🥗 Restrições/Dieta</h4>
            <div className="flex flex-wrap gap-2">
              {['Vegetarian','Lacto-Vegetarian','Ovo-Vegetarian','Lacto-Ovo Vegetarian','Flexitarian','Vegan','Raw Vegan','Whole Food Vegan','Junk Food Vegan','Pescatarian','Pollotarian','Keto','Standard Keto','Cyclical Keto','Targeted Keto','Low-Carb','Atkins','South Beach','Zone Diet','Gluten-Free','Celiac','Non-Celiac Sensitivity','Wheat-Free','Lactose-Free','Dairy-Free','Casein-Free','Halal','Kosher','Kosher Style','Strict Orthodox','Allergies','Nut Allergy','Peanut Allergy','Tree Nut Allergy','Shellfish Allergy','Fish Allergy','Egg Allergy','Soy Allergy','Sesame Allergy','Mustard Allergy','Sulfite Sensitivity','MSG Sensitivity','Nightshade Sensitivity','FODMAP','Low FODMAP','Elimination Diet','Paleo','Autoimmune Paleo','Primal','Whole30','Clean Eating','Anti-Inflammatory','Mediterranean Diet','DASH Diet','MIND Diet','Heart-Healthy','Diabetic-Friendly','Low Sodium','Low Sugar','No Added Sugar','Sugar-Free','Carnivore','Lion Diet','Nose-to-Tail','Organ Meats','Raw Food','Fruitarian','Macrobiotic','Ayurvedic','Sattvic','Blood Type Diet','Intermittent Fasting','16:8','OMAD','5:2','Alternate Day','Calorie Counting','CICO','Portion Control','Intuitive Eating','Mindful Eating','Weight Watchers','Noom','Macro Counting','IIFYM','High Protein','Bodybuilder Diet','Athletic Performance','Pre-Competition','Bulking','Cutting','Maintenance','Pregnancy Diet','Breastfeeding Diet','Pediatric','Senior Nutrition','Medical Diet','Renal Diet','Liver-Friendly','Cancer Diet','Post-Surgery','Tube Feeding','No Restrictions'].map(d => (
                <button key={d} onClick={() => toggleArrayItem('food', 'dietaryRestrictions', d, 4)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.food?.dietaryRestrictions || []).includes(d) ? 'bg-green-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{d}</button>
              ))}
            </div>
          </div>
        </div>

        {/* DRINKS */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🥤 Bebidas Favoritas</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Até 6 bebidas.</p>
          <div className="flex flex-wrap gap-2">
            {['Coffee','Espresso','Americano','Latte','Cappuccino','Flat White','Macchiato','Mocha','Cold Brew','Iced Coffee','Nitro Cold Brew','Pour Over','French Press','Turkish Coffee','Irish Coffee','Vietnamese Coffee','Affogato','Tea','Black Tea','Green Tea','Oolong','White Tea','Pu-erh','Herbal Tea','Chamomile','Peppermint','Rooibos','Chai','Matcha','Earl Grey','English Breakfast','Darjeeling','Jasmine Tea','Bubble Tea','Thai Tea','Water','Sparkling Water','Mineral Water','Flavored Water','Coconut Water','Alkaline Water','Spring Water','Soda/Soft Drinks','Cola','Lemon-Lime','Root Beer','Ginger Ale','Cream Soda','Orange Soda','Grape Soda','Dr Pepper Style','Juice','Orange Juice','Apple Juice','Grape Juice','Cranberry','Pomegranate','Grapefruit','Pineapple','Mango','Passion Fruit','Tomato/V8','Green Juice','Cold Pressed','Smoothies','Fruit Smoothie','Green Smoothie','Protein Smoothie','Acai Bowl Drinks','Energy Drinks','Red Bull Style','Monster Style','Natural Energy','Yerba Mate','Guayusa','Pre-Workout','Wine','Red Wine','Cabernet','Merlot','Pinot Noir','Syrah/Shiraz','Malbec','Tempranillo','Sangiovese','Zinfandel','White Wine','Chardonnay','Sauvignon Blanc','Pinot Grigio','Riesling','Moscato','Gewürztraminer','Rosé','Sparkling Wine','Champagne','Prosecco','Cava','Crémant','Dessert Wine','Port','Sherry','Ice Wine','Fortified Wine','Natural Wine','Orange Wine','Biodynamic','Beer','Lager','Pilsner','Pale Ale','IPA','Double IPA','Hazy IPA','Stout','Porter','Wheat Beer','Belgian','Sour Beer','Gose','Amber Ale','Brown Ale','Kolsch','Hefeweizen','Craft Beer','Import Beer','Light Beer','Non-Alcoholic Beer','Cocktails','Margarita','Mojito','Old Fashioned','Manhattan','Martini','Cosmopolitan','Negroni','Daiquiri','Whiskey Sour','Mai Tai','Piña Colada','Long Island','Moscow Mule','Aperol Spritz','Bellini','Bloody Mary','Mimosa','Gin & Tonic','Rum & Coke','Vodka Soda','Paloma','Espresso Martini','Tiki Drinks','Whiskey/Bourbon','Scotch','Irish Whiskey','Japanese Whisky','Rye','Tennessee','Canadian','Single Malt','Blended','Bourbon','Vodka','Flavored Vodka','Premium Vodka','Craft Vodka','Rum','White Rum','Dark Rum','Spiced Rum','Aged Rum','Cachaça','Tequila','Blanco','Reposado','Añejo','Mezcal','Gin','London Dry','Old Tom','Plymouth','Navy Strength','Botanical Gin','Sake','Junmai','Ginjo','Daiginjo','Nigori','Sparkling Sake','Shochu','Soju','Baijiu','Brandy','Cognac','Armagnac','Calvados','Grappa','Pisco','Liqueurs','Amaretto','Kahlua','Baileys','Grand Marnier','Cointreau','Chartreuse','Limoncello','Sambuca','Jägermeister','Milk/Dairy','Whole Milk','Skim Milk','2% Milk','Chocolate Milk','Buttermilk','Kefir','Lassi','Horchata','Eggnog','Plant Milk','Oat Milk','Almond Milk','Soy Milk','Coconut Milk','Cashew Milk','Rice Milk','Hemp Milk','Kombucha','Hard Kombucha','Jun','Tepache','Kvass','Cider','Hard Cider','Apple Cider','Mulled Cider','Mead','Functional Drinks','Probiotic Drinks','Collagen Drinks','CBD Drinks','Adaptogen Drinks','Electrolyte Drinks','Sports Drinks','Hot Chocolate','Horchata','Agua Fresca','Lemonade','Arnold Palmer','Iced Tea','Sweet Tea'].map(d => (
              <button key={d} onClick={() => toggleArrayItem('food', 'drinks', d, 6)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.food?.drinks || []).includes(d) ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{d}</button>
            ))}
          </div>
        </div>

        {/* ALCOHOL & COFFEE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-sm p-4">
            <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🍷 Relação com Álcool</h4>
            <select value={data.food?.alcoholRelation || ''} onChange={(e) => update('food', 'alcoholRelation', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
              <option value="">-- Selecione --</option>
              <option value="never">Never — Não bebe (escolha pessoal)</option>
              <option value="cant">Cannot — Não pode (saúde, religião)</option>
              <option value="rarely">Rarely — Muito ocasionalmente</option>
              <option value="social">Social — Em eventos sociais</option>
              <option value="regular">Regular — Bebe regularmente</option>
              <option value="heavy">Heavy — Bebe muito/frequente</option>
              <option value="recovering">Recovering — Em recuperação</option>
            </select>
          </div>

          <div className="border border-gray-200 rounded-sm p-4">
            <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">☕ Dependência de Café</h4>
            <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>Não bebe</span><span>IV Drip</span></div>
            <input type="range" min="1" max="9" value={data.food?.coffeeDependency || 5} onChange={(e) => update('food', 'coffeeDependency', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-gray-300 to-amber-700 rounded-lg appearance-none cursor-pointer" />
          </div>
        </div>

        {/* COOKING & FAST FOOD */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-sm p-4">
            <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">👨‍🍳 Frequência de Cozinhar</h4>
            <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>Nunca</span><span>Sempre</span></div>
            <input type="range" min="1" max="9" value={data.food?.cookingFrequency || 5} onChange={(e) => update('food', 'cookingFrequency', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-gray-300 to-orange-400 rounded-lg appearance-none cursor-pointer" />
          </div>

          <div className="border border-gray-200 rounded-sm p-4">
            <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🍔 Atitude com Fast Food</h4>
            <select value={data.food?.fastFoodAttitude || ''} onChange={(e) => update('food', 'fastFoodAttitude', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
              <option value="">-- Selecione --</option>
              <option value="loves">Loves — Adora, come sempre que pode</option>
              <option value="enjoys">Enjoys — Gosta, mas com moderação</option>
              <option value="occasional">Occasional — Só quando conveniente</option>
              <option value="avoids">Avoids — Evita, prefere outras opções</option>
              <option value="refuses">Refuses — Nunca come, questão de princípio</option>
            </select>
          </div>
        </div>

        {/* COMFORT FOODS & GUILTY PLEASURES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-sm p-4">
            <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🤗 Comfort Foods</h4>
            <textarea value={data.food?.comfortFoods || ''} onChange={(e) => update('food', 'comfortFoods', e.target.value)} placeholder="Foods that bring emotional comfort..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
          </div>

          <div className="border border-gray-200 rounded-sm p-4">
            <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">😈 Guilty Pleasures</h4>
            <textarea value={data.food?.guiltyPleasures || ''} onChange={(e) => update('food', 'guiltyPleasures', e.target.value)} placeholder="Guilty pleasures..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
          </div>
        </div>
      </div>
    ),

    // ========== SUBTAB 2: HOBBIES & LEISURE ==========
    2: (
      <div className="space-y-6">
        <div className="bg-green-50 border border-green-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-green-900 mb-2">🎨 HOBBIES & LAZER</h3>
          <p className="font-mono text-xs text-green-800 leading-relaxed">Passatempos, atividades físicas, hobbies criativos e formas de relaxar.</p>
        </div>

        {/* ACTIVE HOBBIES */}
        <div className="border-2 border-red-200 rounded-sm p-4 bg-red-50/30">
          <h4 className="font-mono text-sm font-bold text-red-800 mb-2">🏃 Hobbies Ativos & Esportes</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Atividades físicas e esportivas. Até 8.</p>
          <div className="flex flex-wrap gap-2">
            {['Running','Jogging','Sprinting','Trail Running','Marathon','Ultra Running','Cross Country','Track & Field','Swimming','Lap Swimming','Open Water','Synchronized','Water Polo','Diving','Snorkeling','Cycling','Road Cycling','Mountain Biking','BMX','Cyclocross','Gravel Biking','Spinning','Triathlon','Gym/Weightlifting','Powerlifting','Olympic Lifting','Bodybuilding','CrossFit','Functional Fitness','Calisthenics','HIIT','Circuit Training','Bootcamp','Yoga','Vinyasa','Hatha','Ashtanga','Bikram/Hot Yoga','Restorative','Yin Yoga','Power Yoga','Aerial Yoga','Pilates','Mat Pilates','Reformer Pilates','Barre','Martial Arts','Karate','Taekwondo','Judo','Jiu-Jitsu','BJJ','Muay Thai','Kickboxing','MMA','Kung Fu','Wing Chun','Capoeira','Aikido','Krav Maga','Hapkido','Kendo','Fencing','Boxing','Kickboxing','Cardio Boxing','Dance','Ballet','Contemporary','Jazz Dance','Hip-Hop Dance','Breakdancing','Salsa','Bachata','Tango','Swing','Ballroom','Line Dancing','Belly Dance','Pole Dancing','Zumba','Aerobics','Step Aerobics','Tennis','Pickleball','Padel','Squash','Racquetball','Badminton','Table Tennis','Golf','Disc Golf','Mini Golf','Footgolf','Soccer','Futsal','Beach Soccer','Indoor Soccer','Basketball','3x3 Basketball','Streetball','Volleyball','Beach Volleyball','Indoor Volleyball','Baseball','Softball','Cricket','Rugby','Rugby Union','Rugby League','Touch Rugby','Flag Football','American Football','Touch Football','Hockey','Ice Hockey','Field Hockey','Roller Hockey','Street Hockey','Lacrosse','Ultimate Frisbee','Handball','Netball','Hiking','Day Hiking','Backpacking','Thru-Hiking','Peak Bagging','Climbing','Rock Climbing','Bouldering','Sport Climbing','Trad Climbing','Ice Climbing','Alpine Climbing','Indoor Climbing','Mountaineering','Surfing','Shortboard','Longboard','Bodyboarding','Stand Up Paddle','Windsurfing','Kitesurfing','Wakeboarding','Water Skiing','Jet Skiing','Skiing','Alpine Skiing','Cross-Country Skiing','Backcountry Skiing','Telemark','Snowboarding','Freestyle','Freeride','Splitboarding','Snowshoeing','Ice Skating','Figure Skating','Speed Skating','Roller Skating','Inline Skating','Roller Derby','Skateboarding','Street Skating','Vert Skating','Longboarding','Fishing','Fly Fishing','Deep Sea Fishing','Ice Fishing','Bass Fishing','Kayak Fishing','Spearfishing','Hunting','Big Game Hunting','Bird Hunting','Bow Hunting','Horseback Riding','Dressage','Show Jumping','Eventing','Trail Riding','Western Riding','Polo','Rodeo','Kayaking','White Water Kayaking','Sea Kayaking','Recreational Kayaking','Canoeing','Rowing','Crew/Sculling','Dragon Boat','Rafting','Scuba Diving','Technical Diving','Cave Diving','Wreck Diving','Free Diving','Sailing','Racing','Cruising','Catamaran','Windsurfing','Parkour','Freerunning','Obstacle Course Racing','Ninja Warrior','Mud Runs','Adventure Racing','Orienteering','Geocaching','Airsoft','Paintball','Archery','Target Archery','Field Archery','3D Archery','Shooting Sports','Target Shooting','Clay Pigeon','Biathlon','Motorsports','Go-Karting','Track Days','Rally','Motocross','ATV/Quad','Equestrian','Horse Racing','Polo','Rodeo','E-Sports','Competitive Gaming','Speed Running','VR Fitness','Beat Saber','Ring Fit','Walking','Power Walking','Nordic Walking','Racewalking','Dog Walking','Tai Chi','Qigong','Stretching','Foam Rolling','Animal Flow','Gymnastics','Artistic','Rhythmic','Trampoline','Acrobatics','Circus Arts','Aerial Silks','Trapeze','Cheerleading','Team Sports General','Individual Sports','Combat Sports','Water Sports','Winter Sports','Extreme Sports','Adventure Sports','Mind-Body','Outdoor Recreation','None'].map(h => (
              <button key={h} onClick={() => toggleArrayItem('hobbies', 'activeHobbies', h, 8)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.hobbies?.activeHobbies || []).includes(h) ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{h}</button>
            ))}
          </div>
        </div>

        {/* CREATIVE HOBBIES */}
        <div className="border-2 border-purple-200 rounded-sm p-4 bg-purple-50/30">
          <h4 className="font-mono text-sm font-bold text-purple-800 mb-2">🎨 Hobbies Criativos</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Atividades artísticas e criativas. Até 6.</p>
          <div className="flex flex-wrap gap-2">
            {['Drawing/Sketching','Pencil Drawing','Charcoal','Ink Drawing','Gesture Drawing','Figure Drawing','Botanical Illustration','Architectural Drawing','Fashion Illustration','Caricature','Manga/Anime Art','Comic Art','Painting','Oil Painting','Acrylic','Watercolor','Gouache','Tempera','Encaustic','Spray Paint/Graffiti','Mural Art','Palette Knife','Plein Air','Abstract Painting','Portrait Painting','Landscape Painting','Still Life','Digital Art','Digital Painting','Digital Illustration','Concept Art','Character Design','Environment Design','Pixel Art','Voxel Art','Vector Art','3D Modeling','3D Sculpting','3D Animation','Motion Graphics','VFX','AI Art','NFT Art','Generative Art','Photography','Portrait Photography','Landscape Photography','Street Photography','Wildlife Photography','Macro Photography','Architectural Photography','Product Photography','Food Photography','Fashion Photography','Astrophotography','Drone Photography','Film Photography','Darkroom/Analog','Instant Film','Cyanotype','Alternative Processes','Photo Manipulation','Photo Editing','Videography','Short Films','Documentary','Music Videos','Vlogs','Cinematography','Video Editing','Color Grading','Sound Design','Stop Motion','Animation','Writing/Fiction','Novel Writing','Short Stories','Flash Fiction','Fan Fiction','Genre Fiction','Literary Fiction','Screenwriting','Playwriting','Journaling','Bullet Journaling','Art Journaling','Travel Journaling','Dream Journaling','Gratitude Journaling','Blogging','Personal Blog','Niche Blogging','Microblogging','Newsletter Writing','Poetry','Free Verse','Sonnets','Haiku','Slam Poetry','Spoken Word','Lyric Writing','Music/Instrument','Piano','Guitar','Acoustic Guitar','Electric Guitar','Bass Guitar','Ukulele','Violin','Viola','Cello','Double Bass','Harp','Drums','Percussion','Saxophone','Trumpet','Trombone','French Horn','Clarinet','Flute','Oboe','Bassoon','Harmonica','Accordion','Banjo','Mandolin','Synthesizer','Keyboard','Organ','Turntables','Electronic Music','Beatmaking','Singing','Choral','Opera','A Cappella','Beatboxing','Rapping','Voice Acting','DJing','Club DJ','Radio DJ','Wedding DJ','Turntablism','Music Production','Recording','Mixing','Mastering','Sound Engineering','Foley','Podcast Production','Audio Books','Acting','Theater Acting','Film Acting','Improv','Method Acting','Voice Acting','Motion Capture','Sculpting','Clay Sculpting','Stone Carving','Wood Carving','Ice Sculpting','Sand Sculpting','Wire Sculpture','Found Object Art','Pottery','Wheel Throwing','Hand Building','Glazing','Raku','Porcelain','Stoneware','Earthenware','Ceramic Sculpture','Knitting','Cable Knitting','Fair Isle','Lace Knitting','Sock Knitting','Sweater Making','Crocheting','Amigurumi','Granny Squares','Filet Crochet','Tunisian Crochet','Sewing','Garment Making','Alterations','Quilting','Patchwork','Embroidery','Cross-Stitch','Needlepoint','Hand Embroidery','Machine Embroidery','Beading','Weaving','Loom Weaving','Tapestry','Macramé','Basket Weaving','Felting','Wet Felting','Needle Felting','Woodworking','Furniture Making','Cabinetry','Turning','Whittling','Scroll Saw','Pyrography','Wood Burning','Marquetry','Metalworking','Blacksmithing','Jewelry Making','Silversmithing','Welding','Metal Sculpture','DIY Projects','Home Improvement','Upcycling','Restoration','Crafts','Paper Crafts','Origami','Kirigami','Quilling','Paper Mache','Card Making','Scrapbooking','Bookbinding','Leather Crafting','Candle Making','Soap Making','Resin Art','Epoxy','Glass Blowing','Stained Glass','Mosaic','Enamel','Cosplay','Costume Making','Prop Making','Armor Crafting','Wig Styling','Prosthetics','Makeup Art','Special FX Makeup','Body Painting','Face Painting','Nail Art','Henna','Calligraphy','Western Calligraphy','Chinese Calligraphy','Japanese Calligraphy','Arabic Calligraphy','Brush Lettering','Hand Lettering','Typography','Font Design','Graphic Design','Logo Design','Brand Design','Print Design','Packaging Design','UI/UX Design','Web Design','App Design','Game Design','Interior Design','Fashion Design','Textile Design','Pattern Making','Draping','Surface Design','Floral Design','Flower Arranging','Ikebana','Terrarium Making','Bonsai','Garden Design','Landscape Design','Cake Decorating','Sugar Art','Fondant','Food Styling','Mixology/Cocktail Creation','Perfume Making','Fragrance Blending','Aromatherapy','Herbalism','Tea Blending','Coffee Roasting','Fermentation/Brewing','Home Brewing','Wine Making','Mead Making','Kombucha','Pickling','Model Making','Scale Models','Miniatures','Diorama','Warhammer/Miniature Painting','Dollhouse','Model Trains','RC Vehicles','Drone Building','Robotics','Arduino','Raspberry Pi','Electronics','Circuit Design','Invention','Tattooing','Tattoo Design','Henna Design','None'].map(h => (
              <button key={h} onClick={() => toggleArrayItem('hobbies', 'creativeHobbies', h, 6)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.hobbies?.creativeHobbies || []).includes(h) ? 'bg-purple-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{h}</button>
            ))}
          </div>
        </div>

        {/* MENTAL HOBBIES */}
        <div className="border-2 border-blue-200 rounded-sm p-4 bg-blue-50/30">
          <h4 className="font-mono text-sm font-bold text-blue-800 mb-2">🧠 Hobbies Mentais & Intelectuais</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Atividades que exercitam a mente. Até 6.</p>
          <div className="flex flex-wrap gap-2">
            {['Chess','Speed Chess','Bullet Chess','Correspondence Chess','Chess Puzzles','Chess Variants','Shogi','Go/Weiqi','Xiangqi','Poker/Card Games','Texas Holdem','Omaha','Blackjack','Bridge','Canasta','Rummy','Gin Rummy','Spades','Hearts','Euchre','Pinochle','Cribbage','Solitaire','Patience','Magic: The Gathering','Puzzles/Crosswords','NYT Crossword','Cryptic Crosswords','Word Search','Anagrams','Sudoku','Killer Sudoku','Kakuro','Nonograms','Logic Puzzles','Jigsaw Puzzles','3D Puzzles','Mechanical Puzzles','Rubiks Cube','Speedcubing','Escape Rooms','Puzzle Boxes','Trivia/Quiz','Pub Trivia','Quiz Bowl','Jeopardy Style','Sporcle','General Knowledge','Specialized Trivia','Board Games','Euro Games','Catan','Ticket to Ride','Carcassonne','Agricola','Terraforming Mars','Wingspan','Scythe','Gloomhaven','Pandemic','Cooperative Games','Legacy Games','Deck Building','Dominion','Star Realms','Clank','Worker Placement','Lords of Waterdeep','Viticulture','Strategy Games','Risk','Axis & Allies','Twilight Imperium','Diplomacy','War Games','Wargaming','Miniatures Gaming','Warhammer 40K','Age of Sigmar','Historical Wargames','Party Games','Codenames','Dixit','Telestrations','Wavelength','Deception Games','Mafia/Werewolf','Secret Hitler','Avalon','Abstract Strategy','Azul','Sagrada','Hive','Santorini','Learning Languages','Spanish','French','German','Italian','Portuguese','Japanese','Chinese Mandarin','Korean','Arabic','Russian','Hindi','Greek','Latin','Hebrew','Sign Language','Constructed Languages','Esperanto','Conlangs','Language Exchange','Polyglot Challenge','Online Courses','Coursera','edX','Udemy','Skillshare','MasterClass','Khan Academy','MIT OpenCourseWare','University MOOCs','Certification Courses','Professional Development','Reading','Speed Reading','Book Clubs','Reading Challenges','Audiobooks','Research/Deep Dives','Wikipedia Rabbit Holes','Academic Papers','Investigative Research','OSINT','Fact Checking','Investing/Trading','Stock Trading','Day Trading','Swing Trading','Options','Futures','Forex','Crypto Trading','Value Investing','Index Investing','Real Estate Investing','Dividend Investing','Technical Analysis','Fundamental Analysis','Programming/Coding','Web Development','Mobile Development','Game Development','Data Science','Machine Learning','AI Development','Blockchain','Open Source','Competitive Programming','Hackathons','Code Golf','Automation','Scripting','Building PCs','Custom Builds','Overclocking','Water Cooling','Server Building','Home Lab','NAS Building','Tinkering/Electronics','Arduino Projects','Raspberry Pi','IoT','Home Automation','Smart Home','Soldering','Circuit Design','Radio/Ham Radio','Amateur Radio','SDR','Scanner Listening','3D Printing','FDM Printing','Resin Printing','3D Design','CAD','Parametric Design','Astronomy','Amateur Astronomy','Astrophotography','Telescope Building','Star Parties','Satellite Tracking','Space News','Birdwatching','Bird Photography','Bird Calls','Life Lists','eBird','Birding Tours','Genealogy','Family History','DNA Testing','Ancestry Research','Historical Records','Family Trees','Collecting','Stamps','Coins','Currency','Sports Cards','Trading Cards','Pokemon Cards','Vinyl Records','Vintage Items','Antiques','Art Collecting','Book Collecting','Wine Collecting','Sneaker Collecting','Watch Collecting','Memorabilia','Autographs','Comics','Action Figures','Minerals/Gems','Fossils','Maps','Vintage Tech','Philosophy','Reading Philosophy','Philosophical Debates','Ethics Discussions','Applied Philosophy','Meditation/Mindfulness','Meditation Apps','Mindfulness Practice','Breathwork','Contemplation','Writing Philosophy','Mathematics','Recreational Math','Math Puzzles','Statistics','Probability','Cryptography','Number Theory','History Study','Military History','Ancient History','Medieval Studies','Modern History','Local History','Science Study','Physics','Biology','Chemistry','Astronomy','Earth Science','Environmental Science','Current Events','News Analysis','Geopolitics','Economics','Politics','Debate','Competitive Debate','Casual Debate','Devils Advocate','Rhetoric','Critical Thinking','Logic','Argumentation','Fallacy Spotting','Memory Training','Memory Palace','Mnemonics','Speed Memory','Memory Competitions','Creativity Exercises','Brainstorming','Mind Mapping','Lateral Thinking','TRIZ','None'].map(h => (
              <button key={h} onClick={() => toggleArrayItem('hobbies', 'mentalHobbies', h, 6)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.hobbies?.mentalHobbies || []).includes(h) ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{h}</button>
            ))}
          </div>
        </div>

        {/* RELAXATION */}
        <div className="border-2 border-teal-200 rounded-sm p-4 bg-teal-50/30">
          <h4 className="font-mono text-sm font-bold text-teal-800 mb-2">😌 Atividades de Relaxamento</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Como o personagem relaxa e recarrega. Até 6.</p>
          <div className="flex flex-wrap gap-2">
            {['Watching TV/Movies','Binge Watching','Movie Marathons','Rewatching Favorites','Comfort Shows','Background TV','Reading','Light Reading','Beach Reads','Comfort Rereads','Magazines','Comics/Manga','Napping/Sleeping','Power Naps','Sleep In','Afternoon Naps','Lazy Mornings','Taking Baths','Bubble Baths','Bath Bombs','Hot Springs','Sauna','Steam Room','Hot Tub','Cold Plunge','Walking','Leisurely Walks','Neighborhood Walks','Park Walks','Window Shopping','Aimless Wandering','Listening to Music','Background Music','Active Listening','Vinyl Sessions','Playlist Curating','Music Discovery','Podcasts','Playing Games','Casual Gaming','Mobile Games','Cozy Games','Replay Old Games','Scrolling Social Media','Mindless Scrolling','Meme Browsing','Reddit Browsing','TikTok','Instagram','Twitter Lurking','YouTube Rabbit Holes','Meditation','Guided Meditation','Mindfulness','Body Scan','Breathing Exercises','Progressive Relaxation','ASMR','Visualization','Yoga','Gentle Yoga','Restorative Yoga','Yin Yoga','Stretching','Light Stretching','Morning Stretch','Evening Routine','Foam Rolling','Cooking/Baking','Comfort Food Cooking','Baking Therapy','Meal Prep','Trying New Recipes','Slow Cooking','Gardening','Puttering in Garden','Watering Plants','Plant Care','Houseplants','Weeding','Flower Arranging','Pet Time','Cuddling Pets','Playing with Pets','Walking Dog','Grooming','Training','Just Being Together','Doing Nothing','Staring at Wall','Lying Down','Zoning Out','Quiet Time','Stillness','Nature/Outdoors','Sitting Outside','Porch Sitting','Park Bench','Beach Time','Forest Bathing','Star Gazing','Cloud Watching','Sunset Watching','Sunrise Watching','Shopping','Window Shopping','Online Shopping','Thrift Shopping','Browsing Stores','Retail Therapy','Spa/Self-Care','Face Masks','Skincare Routine','Manicure/Pedicure','Hair Care','Body Care','Massage','Self Massage','Aromatherapy','Essential Oils','Candle Lighting','Incense','Driving','Aimless Driving','Scenic Routes','Late Night Drives','Road Trips','Listening to Music in Car','People Watching','Cafe Sitting','Park Bench','Airport','Mall','Public Spaces','Daydreaming','Mind Wandering','Fantasy','Future Planning','Reminiscing','Imagination','Drinking Tea/Coffee','Tea Ceremony','Coffee Ritual','Morning Coffee','Afternoon Tea','Comfort Drinks','Comfort Foods','Snacking','Eating Treats','Guilty Pleasures','Midnight Snacks','Socializing Casually','Chatting with Friends','Phone Calls','Video Calls','Hanging Out','Comfortable Silence','Crafting','Easy Crafts','Adult Coloring','Diamond Painting','Simple Projects','Organizing','Tidying Up','Decluttering','Sorting Things','Marie Kondo Style','Rearranging','Cleaning','Satisfying Cleaning','Deep Cleaning','Light Tidying','Laundry','Ironing','Watching Sports','Casual Sports Viewing','Background Sports','Game Day','Watching Others Play Games','Twitch','YouTube Gaming','Let\'s Plays','Speedruns','Writing','Journaling','Free Writing','Letters','Lists','Planning','Home Activities','Puzzles','Board Games Solo','Card Games Solo','Crosswords','Sudoku','Hobbies at Easy Pace','Low-Key Creative Work','Maintenance Tasks','Photo Organizing','Listening to Rain','Thunderstorm Sounds','Nature Sounds','White Noise','Lo-Fi','Ambient Music','Binaural Beats','Sound Healing','Hammock','Swing','Rocking Chair','Lounging','Couch Time','Bed Lounging','Floor Time','Sunbathing','Tanning','Vitamin D','Light Exposure','Hugging/Cuddling','Physical Affection','Weighted Blanket','Cozy Clothes','Comfort Items','Sensory Items','Fidget Toys','Texture Play','Prayer/Spiritual','Religious Practice','Spiritual Reading','Contemplation','Gratitude Practice','Affirmations','Screen-Free Time','Digital Detox','Unplugging','Quiet Hours','Tech Sabbath','Nothing Specific','Just Existing','Being Present','Mindful Moments'].map(a => (
              <button key={a} onClick={() => toggleArrayItem('hobbies', 'relaxationActivities', a, 6)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.hobbies?.relaxationActivities || []).includes(a) ? 'bg-teal-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{a}</button>
            ))}
          </div>
        </div>

        {/* COLLECTIONS */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">📦 Coleções</h4>
          <p className="font-mono text-[10px] text-gray-500 mb-3">Se coleciona algo, descreva.</p>
          <textarea value={data.hobbies?.collects || ''} onChange={(e) => update('hobbies', 'collects', e.target.value)} placeholder="Ex: Vinil, selos, action figures, livros raros, moedas, arte, plantas..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs h-20 resize-none" />
        </div>
      </div>
    ),

    // ========== SUBTAB 3: STYLE & AESTHETICS ==========
    3: (
      <div className="space-y-6">
        <div className="bg-pink-50 border border-pink-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-pink-900 mb-2">👔 ESTILO & ESTÉTICA</h3>
          <p className="font-mono text-xs text-pink-800 leading-relaxed">Moda, aparência, cores preferidas, decoração e era estética favorita.</p>
        </div>

        {/* FASHION STYLE */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">👕 Estilo de Moda</h4>
          <select value={data.style?.fashionStyle || ''} onChange={(e) => update('style', 'fashionStyle', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
            <option value="">-- Selecione --</option>
            <optgroup label="Basic Styles">
              <option value="casual">Casual — Jeans, camiseta, confortável</option>
              <option value="smart-casual">Smart Casual — Arrumado mas não formal</option>
              <option value="business-casual">Business Casual — Profissional relaxado</option>
              <option value="formal">Formal/Business — Profissional, elegante</option>
              <option value="black-tie">Black Tie — Formal de gala</option>
              <option value="cocktail">Cocktail — Semi-formal elegante</option>
            </optgroup>
            <optgroup label="Urban & Street">
              <option value="streetwear">Streetwear — Urban, marcas, sneakers</option>
              <option value="hypebeast">Hypebeast — Supreme, Off-White, hype brands</option>
              <option value="skater">Skater — Vans, Thrasher, loose fit</option>
              <option value="hip-hop">Hip-Hop — Oversized, chains, urban luxury</option>
              <option value="techwear">Techwear — Functional, futuristic, black</option>
              <option value="gorpcore">Gorpcore — Outdoor gear as fashion</option>
              <option value="normcore">Normcore — Deliberately plain, anti-fashion</option>
            </optgroup>
            <optgroup label="Alternative & Subculture">
              <option value="gothic">Gothic/Dark — Preto, alternativo, romantic</option>
              <option value="punk">Punk — Rebelde, DIY, patches, studs</option>
              <option value="grunge">Grunge — Flannel, torn jeans, messy</option>
              <option value="emo">Emo — Skinny jeans, band tees, fringe</option>
              <option value="scene">Scene — Colorful, layered, dramatic hair</option>
              <option value="metal">Metal — Band shirts, leather, dark</option>
              <option value="goth-romantic">Romantic Goth — Victorian, lace, velvet</option>
              <option value="cyber-goth">Cyber Goth — Neon, industrial, futuristic</option>
              <option value="pastel-goth">Pastel Goth — Soft colors with dark elements</option>
              <option value="nu-goth">Nu-Goth — Modern minimalist dark</option>
              <option value="witch-core">Witchy/Occult — Dark, mystical, symbolic</option>
            </optgroup>
            <optgroup label="Retro & Vintage">
              <option value="vintage">Vintage/Retro — Roupas de outras décadas</option>
              <option value="rockabilly">Rockabilly — 50s inspired, pompadour</option>
              <option value="pin-up">Pin-Up — 1940s-50s glamour</option>
              <option value="mod">Mod — 60s British, geometric</option>
              <option value="hippie">Hippie — 70s, tie-dye, peace symbols</option>
              <option value="disco">Disco — 70s glamour, shine</option>
              <option value="80s">80s Revival — Neon, big hair, bold</option>
              <option value="90s">90s Nostalgia — Baggy, denim, simple</option>
              <option value="y2k">Y2K — Low rise, butterfly clips, shiny</option>
              <option value="old-money">Old Money — Classic, inherited wealth aesthetic</option>
              <option value="quiet-luxury">Quiet Luxury — Subtle expensive, no logos</option>
            </optgroup>
            <optgroup label="Classic & Elegant">
              <option value="classic">Classic — Timeless pieces, quality basics</option>
              <option value="preppy">Preppy — Clássico, collegiate, polished</option>
              <option value="ivy-league">Ivy League — Academic, traditional</option>
              <option value="nautical">Nautical — Stripes, navy, maritime</option>
              <option value="equestrian">Equestrian — Riding inspired, tailored</option>
              <option value="country-club">Country Club — Tennis, golf aesthetic</option>
              <option value="parisian">Parisian Chic — Effortless French style</option>
              <option value="italian">Italian Style — Sharp, tailored, luxe</option>
              <option value="scandinavian">Scandinavian — Clean, minimal, functional</option>
            </optgroup>
            <optgroup label="Artistic & Creative">
              <option value="bohemian">Bohemian — Fluido, étnico, artístico</option>
              <option value="boho-chic">Boho Chic — Refined bohemian</option>
              <option value="artsy">Artsy — Creative, unusual combinations</option>
              <option value="avant-garde">Avant-Garde — Experimental, conceptual</option>
              <option value="fashion-forward">Fashion Forward — Trend-setting, bold</option>
              <option value="eclectic">Eclectic — Mistura de tudo, unique</option>
              <option value="maximalist">Maximalist — More is more, bold patterns</option>
            </optgroup>
            <optgroup label="Minimalist & Modern">
              <option value="minimalist">Minimalist — Cores neutras, peças simples</option>
              <option value="monochrome">Monochrome — One color palette</option>
              <option value="all-black">All Black — Everything black</option>
              <option value="clean-girl">Clean Girl — Natural, dewy, minimal</option>
              <option value="scandinavian-minimal">Scandi Minimal — Nordic simplicity</option>
              <option value="japanese-minimal">Japanese Minimal — Muji-style simplicity</option>
            </optgroup>
            <optgroup label="Active & Sport">
              <option value="athletic">Athletic/Sporty — Roupas esportivas</option>
              <option value="athleisure">Athleisure — Gym to street</option>
              <option value="yoga">Yoga/Wellness — Comfortable, stretchy</option>
              <option value="tennis-core">Tennis Core — Tennis skirts, polo</option>
              <option value="soccer-casual">Soccer Casual — Jerseys, tracksuits</option>
              <option value="hiking">Outdoor/Hiking — Functional outdoor wear</option>
            </optgroup>
            <optgroup label="Glamour & Statement">
              <option value="glamorous">Glamorous — Chamativo, luxuoso</option>
              <option value="hollywood">Hollywood Glam — Red carpet inspired</option>
              <option value="instagram-baddie">Instagram Baddie — Trendy, curated sexy</option>
              <option value="sexy">Sexy/Revealing — Body-confident, bold</option>
              <option value="club-wear">Club Wear — Night out, flashy</option>
              <option value="festival">Festival — Glitter, bold, expressive</option>
            </optgroup>
            <optgroup label="Cultural & Traditional">
              <option value="traditional">Traditional — Cultural garments</option>
              <option value="modest">Modest Fashion — Covered, elegant</option>
              <option value="hijabi">Hijabi Fashion — Modest with style</option>
              <option value="hanbok-inspired">Korean Traditional Inspired</option>
              <option value="kimono-inspired">Japanese Traditional Inspired</option>
              <option value="african">African Fashion — Ankara, Kente, traditional prints</option>
              <option value="indian">South Asian Fashion — Kurta, saree-inspired</option>
              <option value="latin">Latin Fashion — Colorful, passionate</option>
            </optgroup>
            <optgroup label="Japanese Street">
              <option value="harajuku">Harajuku — Eclectic Japanese street</option>
              <option value="kawaii">Kawaii — Cute, pastel, childlike</option>
              <option value="lolita">Lolita — Victorian doll aesthetic</option>
              <option value="gyaru">Gyaru — Glamorous, tanned, bold makeup</option>
              <option value="visual-kei">Visual Kei — Rock band inspired, dramatic</option>
              <option value="decora">Decora — Excessive accessories, colorful</option>
              <option value="fairy-kei">Fairy Kei — Pastel, 80s toys inspired</option>
              <option value="mori-kei">Mori Kei — Forest girl, natural</option>
              <option value="dark-mori">Dark Mori — Dark forest aesthetic</option>
            </optgroup>
            <optgroup label="Aesthetic Specific">
              <option value="cottagecore">Cottagecore — Rural, pastoral, handmade</option>
              <option value="dark-academia">Dark Academia — Scholarly, vintage, literary</option>
              <option value="light-academia">Light Academia — Lighter scholarly aesthetic</option>
              <option value="royalcore">Royalcore — Regal, crown motifs, luxe</option>
              <option value="fairycore">Fairycore — Ethereal, nature spirits</option>
              <option value="angelcore">Angelcore — Heavenly, white, pure</option>
              <option value="devilcore">Devilcore — Dark, red, edgy</option>
              <option value="cyberpunk">Cyberpunk — Dystopian future, neon</option>
              <option value="steampunk">Steampunk — Victorian + industrial</option>
              <option value="dieselpunk">Dieselpunk — 1920s-40s + diesel technology</option>
              <option value="solarpunk">Solarpunk — Sustainable future aesthetic</option>
              <option value="goblincore">Goblincore — Earthy, moss, found objects</option>
              <option value="clowncore">Clowncore — Circus, colorful, playful</option>
              <option value="kidcore">Kidcore — Nostalgic childhood, bright</option>
              <option value="weirdcore">Weirdcore — Surreal, unsettling</option>
            </optgroup>
            <optgroup label="Practical & Lifestyle">
              <option value="practical">Practical — Funcional acima de tudo</option>
              <option value="workwear">Workwear — Durable, functional</option>
              <option value="military">Military — Army surplus, tactical</option>
              <option value="western">Western — Cowboy, boots, denim</option>
              <option value="coastal">Coastal Grandmother — Relaxed, linen, beachy</option>
              <option value="soft-boy">Soft Boy — Pastel, cardigans, gentle</option>
              <option value="soft-girl">Soft Girl — Blush, hearts, cute</option>
              <option value="e-boy">E-Boy — TikTok, chain, striped undershirt</option>
              <option value="e-girl">E-Girl — TikTok, blush, winged liner</option>
              <option value="vsco-girl">VSCO Girl — Scrunchies, Hydro Flask</option>
              <option value="dad-style">Dad Style — Practical, comfortable, unfashionable</option>
              <option value="mom-style">Mom Style — Practical, comfortable, family-focused</option>
              <option value="no-style">No Defined Style — Veste o que tiver</option>
              <option value="anti-fashion">Anti-Fashion — Deliberately unfashionable</option>
              <option value="whatever-clean">Whatever is Clean — No thought given</option>
            </optgroup>
          </select>
        </div>

        {/* APPEARANCE IMPORTANCE & DRESS CODE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-sm p-4">
            <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">💄 Importância da Aparência</h4>
            <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>Não liga</span><span>Obsessed</span></div>
            <input type="range" min="1" max="9" value={data.style?.appearanceImportance || 5} onChange={(e) => update('style', 'appearanceImportance', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-gray-300 to-pink-400 rounded-lg appearance-none cursor-pointer" />
          </div>

          <div className="border border-gray-200 rounded-sm p-4">
            <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">👔 Dress Code Pessoal</h4>
            <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>Pijama OK</span><span>Sempre Arrumado</span></div>
            <input type="range" min="1" max="9" value={data.style?.dressCode || 5} onChange={(e) => update('style', 'dressCode', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-gray-300 to-violet-400 rounded-lg appearance-none cursor-pointer" />
          </div>
        </div>

        {/* SIGNATURE ITEM */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">⭐ Peça Signature / Item Característico</h4>
          <input type="text" value={data.style?.signatureItem || ''} onChange={(e) => update('style', 'signatureItem', e.target.value)} placeholder="Ex: Jaqueta de couro, óculos redondos, sempre de preto, relógio específico..." className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs" />
        </div>

        {/* COLORS */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-3">🎨 Cores</h4>
          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Favorite Colors (up to 3)</label>
              <div className="flex flex-wrap gap-2">
                {[
                  {name:'Black',color:'bg-black'},{name:'Charcoal',color:'bg-gray-800'},{name:'Jet Black',color:'bg-neutral-950'},
                  {name:'White',color:'bg-white border border-gray-300'},{name:'Off-White',color:'bg-stone-100'},{name:'Cream',color:'bg-amber-50'},
                  {name:'Ivory',color:'bg-yellow-50'},{name:'Pearl',color:'bg-gray-100'},
                  {name:'Gray',color:'bg-gray-500'},{name:'Light Gray',color:'bg-gray-300'},{name:'Dark Gray',color:'bg-gray-700'},{name:'Slate',color:'bg-slate-600'},
                  {name:'Red',color:'bg-red-500'},{name:'Crimson',color:'bg-red-700'},{name:'Scarlet',color:'bg-red-600'},{name:'Cherry',color:'bg-rose-600'},
                  {name:'Burgundy',color:'bg-rose-900'},{name:'Maroon',color:'bg-red-900'},{name:'Wine',color:'bg-rose-800'},{name:'Rust',color:'bg-orange-700'},
                  {name:'Orange',color:'bg-orange-500'},{name:'Tangerine',color:'bg-orange-400'},{name:'Peach',color:'bg-orange-200'},{name:'Coral',color:'bg-red-400'},
                  {name:'Salmon',color:'bg-red-300'},{name:'Apricot',color:'bg-orange-300'},{name:'Burnt Orange',color:'bg-orange-600'},
                  {name:'Yellow',color:'bg-yellow-400'},{name:'Golden Yellow',color:'bg-yellow-500'},{name:'Lemon',color:'bg-yellow-300'},{name:'Mustard',color:'bg-yellow-600'},
                  {name:'Amber',color:'bg-amber-500'},{name:'Honey',color:'bg-amber-400'},{name:'Marigold',color:'bg-yellow-500'},
                  {name:'Green',color:'bg-green-500'},{name:'Forest Green',color:'bg-green-800'},{name:'Emerald',color:'bg-emerald-500'},{name:'Jade',color:'bg-emerald-600'},
                  {name:'Sage',color:'bg-green-300'},{name:'Mint',color:'bg-green-200'},{name:'Olive',color:'bg-lime-700'},{name:'Lime',color:'bg-lime-500'},
                  {name:'Kelly Green',color:'bg-green-600'},{name:'Hunter Green',color:'bg-green-900'},{name:'Seafoam',color:'bg-emerald-200'},
                  {name:'Teal',color:'bg-teal-500'},{name:'Turquoise',color:'bg-cyan-400'},{name:'Aqua',color:'bg-cyan-300'},{name:'Cyan',color:'bg-cyan-500'},
                  {name:'Blue',color:'bg-blue-500'},{name:'Sky Blue',color:'bg-sky-400'},{name:'Baby Blue',color:'bg-blue-200'},{name:'Powder Blue',color:'bg-blue-300'},
                  {name:'Royal Blue',color:'bg-blue-700'},{name:'Cobalt',color:'bg-blue-600'},{name:'Sapphire',color:'bg-blue-800'},
                  {name:'Navy',color:'bg-blue-900'},{name:'Midnight Blue',color:'bg-indigo-950'},{name:'Steel Blue',color:'bg-slate-500'},
                  {name:'Indigo',color:'bg-indigo-600'},{name:'Periwinkle',color:'bg-indigo-300'},
                  {name:'Purple',color:'bg-purple-500'},{name:'Violet',color:'bg-violet-500'},{name:'Lavender',color:'bg-purple-300'},{name:'Lilac',color:'bg-purple-200'},
                  {name:'Plum',color:'bg-purple-800'},{name:'Eggplant',color:'bg-purple-900'},{name:'Amethyst',color:'bg-violet-600'},{name:'Orchid',color:'bg-fuchsia-400'},
                  {name:'Pink',color:'bg-pink-500'},{name:'Hot Pink',color:'bg-pink-600'},{name:'Magenta',color:'bg-fuchsia-600'},{name:'Fuchsia',color:'bg-fuchsia-500'},
                  {name:'Rose',color:'bg-rose-400'},{name:'Blush',color:'bg-pink-200'},{name:'Baby Pink',color:'bg-pink-100'},{name:'Dusty Rose',color:'bg-rose-300'},
                  {name:'Mauve',color:'bg-pink-300'},{name:'Bubblegum',color:'bg-pink-400'},
                  {name:'Brown',color:'bg-amber-700'},{name:'Chocolate',color:'bg-amber-900'},{name:'Coffee',color:'bg-amber-800'},{name:'Espresso',color:'bg-stone-800'},
                  {name:'Tan',color:'bg-amber-300'},{name:'Caramel',color:'bg-amber-600'},{name:'Cinnamon',color:'bg-orange-800'},{name:'Terracotta',color:'bg-orange-700'},
                  {name:'Sienna',color:'bg-amber-700'},{name:'Umber',color:'bg-stone-700'},{name:'Taupe',color:'bg-stone-400'},
                  {name:'Beige',color:'bg-amber-100'},{name:'Sand',color:'bg-amber-200'},{name:'Khaki',color:'bg-yellow-700'},{name:'Oatmeal',color:'bg-stone-200'},
                  {name:'Gold',color:'bg-yellow-600'},{name:'Champagne',color:'bg-yellow-100'},{name:'Bronze',color:'bg-amber-600'},
                  {name:'Copper',color:'bg-orange-600'},{name:'Rose Gold',color:'bg-rose-300'},
                  {name:'Silver',color:'bg-gray-400'},{name:'Platinum',color:'bg-gray-300'},{name:'Pewter',color:'bg-gray-500'},
                  {name:'Neon Pink',color:'bg-pink-500'},{name:'Neon Green',color:'bg-lime-400'},{name:'Neon Yellow',color:'bg-yellow-300'},
                  {name:'Neon Orange',color:'bg-orange-400'},{name:'Electric Blue',color:'bg-blue-400'}
                ].map(c => (
                  <button key={c.name} onClick={() => toggleArrayItem('style', 'favoriteColors', c.name, 3)} className={`px-3 py-1 rounded-full font-mono text-[9px] transition-all flex items-center gap-1 ${(data.style?.favoriteColors || []).includes(c.name) ? 'ring-2 ring-offset-1 ring-pink-500' : ''}`}>
                    <span className={`w-3 h-3 rounded-full ${c.color}`}></span> {c.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Colors Avoided (até 2)</label>
              <div className="flex flex-wrap gap-2">
                {['Black','White','Gray','Red','Orange','Yellow','Green','Blue','Purple','Pink','Brown','Neon','Pastels','None'].map(c => (
                  <button key={c} onClick={() => toggleArrayItem('style', 'avoidColors', c, 2)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.style?.avoidColors || []).includes(c) ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{c}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Paleta Geral</label>
              <select value={data.style?.colorPalette || ''} onChange={(e) => update('style', 'colorPalette', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
                <option value="">-- Selecione --</option>
                <option value="bright">Bright & Vibrant — Cores vivas e chamativas</option>
                <option value="muted">Muted & Soft — Tons suaves e apagados</option>
                <option value="dark">Dark & Moody — Tons escuros e dramáticos</option>
                <option value="neutral">Neutral — Preto, branco, bege, cinza</option>
                <option value="earthy">Earthy — Tons terrosos, naturais</option>
                <option value="pastel">Pastel — Tons claros e delicados</option>
                <option value="colorful">Colorful — Arco-íris, muitas cores</option>
                <option value="monochrome">Monochrome — Uma cor só, variações de tom</option>
              </select>
            </div>
          </div>
        </div>

        {/* DECORATION STYLE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-sm p-4">
            <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🏠 Decor Style</h4>
            <select value={data.style?.decorStyle || ''} onChange={(e) => update('style', 'decorStyle', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
              <option value="">-- Selecione --</option>
              <optgroup label="Modern & Contemporary">
                <option value="modern">Modern/Contemporary — Linhas limpas, atual</option>
                <option value="minimalist">Minimalist — Pouco, funcional, espaço</option>
                <option value="mid-century-modern">Mid-Century Modern — 1950s-60s design icons</option>
                <option value="contemporary">Contemporary — Current trends, evolving</option>
                <option value="transitional">Transitional — Traditional meets modern</option>
                <option value="urban-modern">Urban Modern — City loft aesthetic</option>
              </optgroup>
              <optgroup label="Traditional & Classic">
                <option value="traditional">Traditional — Clássico, atemporal</option>
                <option value="classic">Classic — Timeless elegance</option>
                <option value="victorian">Victorian — Ornate, antique, dramatic</option>
                <option value="edwardian">Edwardian — Elegant, lighter Victorian</option>
                <option value="georgian">Georgian — 18th century English</option>
                <option value="colonial">Colonial — American colonial style</option>
                <option value="art-deco">Art Deco — 1920s-30s glamour, geometric</option>
                <option value="art-nouveau">Art Nouveau — Organic curves, nature</option>
                <option value="baroque">Baroque — Ornate, gilded, dramatic</option>
                <option value="rococo">Rococo — Elaborate, pastel, romantic</option>
                <option value="neoclassical">Neoclassical — Greek/Roman inspired</option>
                <option value="regency">Regency — Early 19th century British</option>
              </optgroup>
              <optgroup label="Industrial & Urban">
                <option value="industrial">Industrial — Tijolos, metal, urbano</option>
                <option value="warehouse">Warehouse — Raw, open, converted</option>
                <option value="loft">Loft — Open plan, high ceilings</option>
                <option value="urban">Urban Industrial — City grit, exposed</option>
                <option value="steampunk-decor">Steampunk — Victorian industrial fusion</option>
              </optgroup>
              <optgroup label="Bohemian & Eclectic">
                <option value="bohemian">Bohemian — Plantas, texturas, global</option>
                <option value="boho-chic">Boho Chic — Refined bohemian</option>
                <option value="eclectic">Eclectic — Mistura de estilos</option>
                <option value="maximalist">Maximalist — Cheio, colorido, coleções</option>
                <option value="global">Global/World — Multicultural influences</option>
                <option value="moroccan">Moroccan — Tiles, lanterns, rich colors</option>
                <option value="indian">Indian — Vibrant, ornate, textiles</option>
              </optgroup>
              <optgroup label="Scandinavian & Nordic">
                <option value="scandinavian">Scandinavian — Claro, madeira, hygge</option>
                <option value="nordic">Nordic — Clean, functional, cozy</option>
                <option value="danish-modern">Danish Modern — Mid-century Nordic</option>
                <option value="hygge">Hygge — Cozy, warm, comfortable</option>
                <option value="lagom">Lagom — Swedish balance, just right</option>
              </optgroup>
              <optgroup label="Vintage & Retro">
                <option value="vintage">Vintage/Retro — Móveis antigos, nostalgia</option>
                <option value="retro">Retro — Specific era throwback</option>
                <option value="50s-retro">1950s Retro — Atomic age, pastels</option>
                <option value="60s-retro">1960s Retro — Mod, pop art</option>
                <option value="70s-retro">1970s Retro — Earth tones, shag</option>
                <option value="80s-retro">1980s Retro — Memphis, neon, bold</option>
                <option value="90s-retro">1990s Retro — Minimalist, natural</option>
                <option value="shabby-chic">Shabby Chic — Worn, feminine, vintage</option>
                <option value="cottagecore-decor">Cottagecore — Rural, handmade, nostalgic</option>
              </optgroup>
              <optgroup label="Rustic & Natural">
                <option value="rustic">Rustic — Madeira, campo, aconchegante</option>
                <option value="farmhouse">Farmhouse — Country charm, practical</option>
                <option value="modern-farmhouse">Modern Farmhouse — Updated country</option>
                <option value="cabin">Cabin — Lodge, mountain, cozy</option>
                <option value="lodge">Lodge — Hunting lodge, masculine</option>
                <option value="country">Country — Traditional rural charm</option>
                <option value="french-country">French Country — Provence inspired</option>
                <option value="tuscan">Tuscan — Italian countryside warmth</option>
                <option value="southwestern">Southwestern — Desert, Native American</option>
              </optgroup>
              <optgroup label="Coastal & Beach">
                <option value="coastal">Coastal — Beach, nautical, relaxed</option>
                <option value="beach-house">Beach House — Sandy, light, casual</option>
                <option value="nautical">Nautical — Maritime, navy, rope</option>
                <option value="hamptons">Hamptons — Elegant beach, white</option>
                <option value="tropical">Tropical — Island, palms, bright</option>
                <option value="caribbean">Caribbean — Colorful, island, relaxed</option>
                <option value="mediterranean">Mediterranean — Blue, white, terracotta</option>
              </optgroup>
              <optgroup label="Asian Inspired">
                <option value="japanese">Japanese — Minimalist, zen, natural</option>
                <option value="wabi-sabi">Wabi-Sabi — Imperfection, simplicity</option>
                <option value="zen">Zen — Peaceful, minimal, balanced</option>
                <option value="chinese">Chinese — Red, gold, ornate</option>
                <option value="asian-fusion">Asian Fusion — Mixed Asian influences</option>
                <option value="korean">Korean — Modern, minimal, functional</option>
              </optgroup>
              <optgroup label="Glamorous & Luxe">
                <option value="glam">Hollywood Glam — Luxurious, dramatic</option>
                <option value="hollywood-regency">Hollywood Regency — Bold, glamorous</option>
                <option value="luxury">Luxury — High-end, expensive materials</option>
                <option value="parisian">Parisian — French elegance, ornate</option>
                <option value="french">French — Elegant, romantic, refined</option>
              </optgroup>
              <optgroup label="Specific Aesthetics">
                <option value="dark-academia-decor">Dark Academia — Books, leather, wood</option>
                <option value="light-academia-decor">Light Academia — Bright, scholarly</option>
                <option value="witchy">Witchy/Occult — Mystical, dark, crystals</option>
                <option value="gothic-decor">Gothic — Dark, dramatic, ornate</option>
                <option value="punk-decor">Punk — DIY, rebellious, edgy</option>
                <option value="kawaii-decor">Kawaii — Cute, pastel, playful</option>
                <option value="anime">Anime/Otaku — Collectibles, posters</option>
                <option value="gamer">Gamer — RGB, tech, collectibles</option>
                <option value="memphis">Memphis Design — Bold 80s, geometric</option>
                <option value="brutalist">Brutalist — Concrete, raw, bold</option>
                <option value="biophilic">Biophilic — Plants, nature, green</option>
                <option value="organic-modern">Organic Modern — Natural shapes, materials</option>
              </optgroup>
              <optgroup label="Practical">
                <option value="functional">Functional — Practical, organized</option>
                <option value="bachelor-pad">Bachelor Pad — Masculine, simple</option>
                <option value="student">Student — Budget, temporary, practical</option>
                <option value="family">Family-Friendly — Durable, safe, practical</option>
                <option value="pet-friendly">Pet-Friendly — Durable, washable</option>
                <option value="dont-care">Does Not Care — Funcional, sem estilo</option>
              </optgroup>
            </select>
          </div>

          <div className="border border-gray-200 rounded-sm p-4">
            <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">📐 Organization Level</h4>
            <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>Caótico</span><span>Impecável</span></div>
            <input type="range" min="1" max="9" value={data.style?.organizationLevel || 5} onChange={(e) => update('style', 'organizationLevel', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-red-300 to-blue-400 rounded-lg appearance-none cursor-pointer" />
          </div>
        </div>

        {/* SPACE IMPORTANCE */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🚪 Importance of Space Pessoal</h4>
          <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>Não liga</span><span>Muito importante</span></div>
          <input type="range" min="1" max="9" value={data.style?.spaceImportance || 5} onChange={(e) => update('style', 'spaceImportance', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-gray-300 to-indigo-400 rounded-lg appearance-none cursor-pointer" />
        </div>

        {/* FAVORITE ERA */}
        <div className="border border-gray-200 rounded-sm p-4">
          <h4 className="font-mono text-sm font-bold text-gray-800 mb-2">🕰️ Era/Época Estética Favorita</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select value={data.style?.favoriteEra || ''} onChange={(e) => update('style', 'favoriteEra', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs">
              <option value="">-- Selecione --</option>
              <option value="ancient">Ancient (Greek, Roman, Egyptian)</option>
              <option value="medieval">Medieval (Knights, Castles)</option>
              <option value="renaissance">Renaissance (1400s-1600s)</option>
              <option value="victorian">Victorian (1837-1901)</option>
              <option value="edwardian">Edwardian/Belle Époque (1900-1910s)</option>
              <option value="1920s">1920s (Art Deco, Jazz Age)</option>
              <option value="1940s">1940s (WWII Era, Classic Hollywood)</option>
              <option value="1950s">1950s (Mid-Century, Rock and Roll)</option>
              <option value="1960s">1960s (Mod, Hippie, Space Age)</option>
              <option value="1970s">1970s (Disco, Bohemian)</option>
              <option value="1980s">1980s (Neon, Synth, Excess)</option>
              <option value="1990s">1990s (Grunge, Minimalism)</option>
              <option value="y2k">Y2K/2000s (Cyber, Pop)</option>
              <option value="2010s">2010s (Hipster, Instagram)</option>
              <option value="futuristic">Futuristic (Sci-Fi, Cyberpunk)</option>
              <option value="timeless">Timeless/No Preference</option>
            </select>
            <input type="text" value={data.style?.eraReason || ''} onChange={(e) => update('style', 'eraReason', e.target.value)} placeholder="Por quê? (nostalgia, estética, história...)" className="w-full bg-white border border-gray-200 rounded-sm py-2 px-3 font-mono text-xs" />
          </div>
        </div>
      </div>
    ),

    // ========== SUBTAB 4: TASTES & PREFERENCES ==========
    4: (
      <div className="space-y-6">
        <div className="bg-cyan-50 border border-cyan-200 rounded-sm p-4">
          <h3 className="font-mono text-sm font-bold text-cyan-900 mb-2">⭐ GOSTOS & PREFERÊNCIAS</h3>
          <p className="font-mono text-xs text-cyan-800 leading-relaxed">Preferências gerais: clima, ambiente, animais, viagem e tendências pessoais.</p>
        </div>

        {/* ENVIRONMENT */}
        <div className="border-2 border-green-200 rounded-sm p-4 bg-green-50/30">
          <h4 className="font-mono text-sm font-bold text-green-800 mb-3">🌍 Ambiente & Clima</h4>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Natureza vs Urbano</label>
              <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>🌲 Nature</span><span>🏙️ Urban</span></div>
              <input type="range" min="1" max="9" value={data.preferences?.natureUrban || 5} onChange={(e) => update('preferences', 'natureUrban', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-green-400 to-gray-500 rounded-lg appearance-none cursor-pointer" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Clima Preferido</label>
                <select value={data.preferences?.climate || ''} onChange={(e) => update('preferences', 'climate', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]">
                  <option value="">-- Selecione --</option>
                  <option value="tropical">Tropical — Quente e úmido o ano todo</option>
                  <option value="mediterranean">Mediterranean — Verões secos, invernos suaves</option>
                  <option value="temperate">Temperate — Quatro estações distintas</option>
                  <option value="continental">Continental — Extremos de calor e frio</option>
                  <option value="arid">Arid/Desert — Quente e seco</option>
                  <option value="arctic">Cold/Arctic — Frio a maior parte do ano</option>
                  <option value="mild">Mild — Nem muito quente nem muito frio</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Estação Favorita</label>
                <select value={data.preferences?.season || ''} onChange={(e) => update('preferences', 'season', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]">
                  <option value="">-- Selecione --</option>
                  <option value="spring">🌸 Spring — Renovação, flores, clima ameno</option>
                  <option value="summer">☀️ Summer — Calor, praia, dias longos</option>
                  <option value="fall">🍂 Fall — Folhas, colheita, clima fresco</option>
                  <option value="winter">❄️ Winter — Frio, neve, festas</option>
                  <option value="no-preference">No Preference</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Horário do Dia</label>
                <select value={data.preferences?.timeOfDay || ''} onChange={(e) => update('preferences', 'timeOfDay', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]">
                  <option value="">-- Selecione --</option>
                  <option value="early-morning">🌅 Early Morning (5-8am)</option>
                  <option value="morning">☀️ Morning Person (8am-12pm)</option>
                  <option value="afternoon">🌤️ Afternoon (12-5pm)</option>
                  <option value="evening">🌆 Evening (5-9pm)</option>
                  <option value="night">🌙 Night Owl (9pm-1am)</option>
                  <option value="late-night">🦇 Late Night (1-5am)</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Silêncio vs Ruído</label>
                <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>🤫 Silence</span><span>🔊 Noise</span></div>
                <input type="range" min="1" max="9" value={data.preferences?.silenceNoise || 5} onChange={(e) => update('preferences', 'silenceNoise', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-blue-300 to-orange-400 rounded-lg appearance-none cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        {/* ANIMALS */}
        <div className="border-2 border-amber-200 rounded-sm p-4 bg-amber-50/30">
          <h4 className="font-mono text-sm font-bold text-amber-800 mb-3">🐾 Animais</h4>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-2 block">Favorite Animals (up to 3)</label>
              <div className="flex flex-wrap gap-2">
                {['Dogs','Puppies','Golden Retriever','Labrador','German Shepherd','Husky','Corgi','Poodle','Bulldog','Beagle','Border Collie','Shiba Inu','Pomeranian','Chihuahua','Great Dane','Rottweiler','Dalmatian','Pit Bull','Cats','Kittens','Persian','Siamese','Maine Coon','British Shorthair','Scottish Fold','Bengal','Ragdoll','Sphynx','Tabby','Black Cat','Orange Tabby','Tuxedo Cat','Horses','Wild Horses','Ponies','Unicorns','Pegasus','Zebras','Donkeys','Birds','Parrots','Macaws','Cockatoos','Budgies','Cockatiels','Lovebirds','Canaries','Finches','Doves','Pigeons','Crows','Ravens','Magpies','Hummingbirds','Peacocks','Flamingos','Swans','Ducks','Geese','Chickens','Roosters','Turkeys','Fish','Goldfish','Koi','Betta Fish','Tropical Fish','Clownfish','Sharks','Great White Shark','Whale Shark','Manta Rays','Stingrays','Seahorses','Jellyfish','Octopus','Squid','Starfish','Sea Turtles','Rabbits','Bunnies','Lop-Eared Rabbits','Hamsters','Guinea Pigs','Chinchillas','Ferrets','Gerbils','Mice','Rats','Hedgehogs','Sugar Gliders','Snakes','Pythons','Boa Constrictors','Corn Snakes','Ball Pythons','Cobras','Rattlesnakes','Lizards','Geckos','Leopard Geckos','Bearded Dragons','Chameleons','Iguanas','Komodo Dragons','Monitor Lizards','Salamanders','Newts','Axolotls','Frogs','Tree Frogs','Poison Dart Frogs','Toads','Turtles','Tortoises','Box Turtles','Crocodiles','Alligators','Spiders','Tarantulas','Jumping Spiders','Black Widows','Scorpions','Crabs','Hermit Crabs','Lobsters','Shrimp','Insects','Butterflies','Monarch Butterflies','Moths','Luna Moths','Ladybugs','Fireflies','Dragonflies','Damselflies','Bees','Bumblebees','Honeybees','Praying Mantis','Beetles','Stag Beetles','Rhinoceros Beetles','Ants','Caterpillars','Grasshoppers','Crickets','Cicadas','Wolves','Gray Wolves','Arctic Wolves','Timber Wolves','Werewolves','Lions','Lionesses','White Lions','Tigers','Bengal Tigers','White Tigers','Siberian Tigers','Bears','Grizzly Bears','Polar Bears','Black Bears','Panda Bears','Red Pandas','Koalas','Sun Bears','Sloth Bears','Elephants','African Elephants','Asian Elephants','Baby Elephants','Mammoths','Dolphins','Bottlenose Dolphins','Orcas/Killer Whales','Porpoises','Whales','Blue Whales','Humpback Whales','Sperm Whales','Beluga Whales','Narwhals','Owls','Barn Owls','Snowy Owls','Great Horned Owls','Burrowing Owls','Eagle Owls','Eagles','Bald Eagles','Golden Eagles','Hawks','Falcons','Peregrine Falcons','Vultures','Condors','Ospreys','Foxes','Red Foxes','Arctic Foxes','Fennec Foxes','Gray Foxes','Deer','Fawns','Elk','Moose','Reindeer','Caribou','Antelope','Gazelles','Impala','Pandas','Giant Pandas','Red Pandas','Penguins','Emperor Penguins','King Penguins','Adelie Penguins','Little Blue Penguins','Puffins','Monkeys','Chimpanzees','Gorillas','Orangutans','Bonobos','Baboons','Macaques','Capuchins','Spider Monkeys','Howler Monkeys','Lemurs','Ring-Tailed Lemurs','Aye-Ayes','Gibbons','Sloths','Two-Toed Sloths','Three-Toed Sloths','Anteaters','Armadillos','Pangolins','Bats','Flying Foxes','Fruit Bats','Vampire Bats','Squirrels','Chipmunks','Flying Squirrels','Prairie Dogs','Groundhogs','Beavers','Otters','Sea Otters','River Otters','Seals','Sea Lions','Walruses','Manatees','Dugongs','Hippos','Pygmy Hippos','Rhinos','White Rhinos','Black Rhinos','Giraffes','Okapi','Camels','Llamas','Alpacas','Vicuñas','Kangaroos','Wallabies','Wombats','Tasmanian Devils','Platypus','Possums','Opossums','Raccoons','Badgers','Honey Badgers','Wolverines','Minks','Weasels','Stoats','Skunks','Porcupines','Hyenas','Cheetahs','Leopards','Snow Leopards','Clouded Leopards','Jaguars','Panthers','Black Panthers','Cougars/Mountain Lions','Lynx','Bobcats','Caracals','Servals','Ocelots','Wildcats','Buffalos','Bison','Yaks','Oxen','Bulls','Cows','Highland Cattle','Goats','Mountain Goats','Ibex','Sheep','Bighorn Sheep','Lambs','Pigs','Wild Boars','Warthogs','Tapirs','Mongooses','Meerkats','Aardvarks','Capybaras','Nutrias','Maras','Chinchillas','Pikas','Hares','Jackrabbits','Coyotes','Dingoes','Jackals','African Wild Dogs','Dholes','Dinosaurs','T-Rex','Velociraptors','Triceratops','Brontosaurus','Pterodactyls','Stegosaurus','Dragons','Phoenix','Griffins','Mythical Creatures','None'].map(a => (
                  <button key={a} onClick={() => toggleArrayItem('preferences', 'favoriteAnimals', a, 3)} className={`px-2 py-1 rounded-full font-mono text-[9px] transition-all ${(data.preferences?.favoriteAnimals || []).includes(a) ? 'bg-amber-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>{a}</button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Preferência de Pet</label>
                <select value={data.preferences?.petPreference || ''} onChange={(e) => update('preferences', 'petPreference', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]">
                  <option value="">-- Selecione --</option>
                  <option value="dogs">🐕 Dogs — Definitivamente cães</option>
                  <option value="cats">🐈 Cats — Definitivamente gatos</option>
                  <option value="both">Both — Ama os dois igualmente</option>
                  <option value="small">Small Pets — Hamsters, coelhos, etc.</option>
                  <option value="exotic">Exotic — Répteis, aves, exóticos</option>
                  <option value="fish">Fish/Aquarium — Peixes</option>
                  <option value="none">No Pets — Não quer ter pets</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Relação com Animais</label>
                <select value={data.preferences?.animalRelation || ''} onChange={(e) => update('preferences', 'animalRelation', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]">
                  <option value="">-- Selecione --</option>
                  <option value="loves">Loves — Adora todos os animais</option>
                  <option value="likes">Likes — Gosta da maioria</option>
                  <option value="neutral">Neutral — Indiferente</option>
                  <option value="selective">Selective — Gosta de alguns, não de outros</option>
                  <option value="fears">Fears — Tem medo de muitos</option>
                  <option value="allergic">Allergic — Alérgico</option>
                  <option value="dislikes">Dislikes — Não gosta de animais</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* TRAVEL */}
        <div className="border-2 border-blue-200 rounded-sm p-4 bg-blue-50/30">
          <h4 className="font-mono text-sm font-bold text-blue-800 mb-3">✈️ Viagem</h4>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Estilo de Viagem</label>
                <select value={data.preferences?.travelStyle || ''} onChange={(e) => update('preferences', 'travelStyle', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]">
                  <option value="">-- Selecione --</option>
                  <optgroup label="Accommodation Style">
                    <option value="luxury">Luxury — 5 estrelas, conforto máximo</option>
                    <option value="ultra-luxury">Ultra-Luxury — Private jets, villas</option>
                    <option value="boutique">Boutique Hotels — Unique, designed</option>
                    <option value="comfortable">Comfortable — Bom hotel, sem exageros</option>
                    <option value="mid-range">Mid-Range — 3-4 stars, reliable</option>
                    <option value="budget">Budget — Basic but clean</option>
                    <option value="backpacker">Backpacker — Mochilão, hostels, budget</option>
                    <option value="hostel">Hostel Hopper — Social, shared</option>
                    <option value="airbnb">Airbnb/Vacation Rental — Local living</option>
                    <option value="couchsurfing">Couchsurfing — Free, social, trusting</option>
                    <option value="camping">Camping — Tent, under the stars</option>
                    <option value="glamping">Glamping — Luxury camping</option>
                    <option value="rv">RV/Campervan — Mobile home</option>
                    <option value="van-life">Van Life — Minimalist mobile</option>
                  </optgroup>
                  <optgroup label="Activity Focus">
                    <option value="adventure">Adventure — Trilhas, radical, natureza</option>
                    <option value="extreme">Extreme Adventure — Skydiving, bungee</option>
                    <option value="hiking">Hiking/Trekking — Trails, mountains</option>
                    <option value="mountaineering">Mountaineering — Summits, climbing</option>
                    <option value="safari">Safari — Wildlife, Africa</option>
                    <option value="wildlife">Wildlife Tourism — Animal focused</option>
                    <option value="scuba">Scuba/Diving — Underwater exploration</option>
                    <option value="surfing-travel">Surf Travel — Chasing waves</option>
                    <option value="ski">Ski/Snow — Winter sports destinations</option>
                    <option value="cultural">Cultural — Museus, história, locais</option>
                    <option value="historical">Historical — Ancient sites, ruins</option>
                    <option value="religious">Religious/Pilgrimage — Spiritual sites</option>
                    <option value="culinary">Culinary/Food — Eating, cooking classes</option>
                    <option value="wine">Wine Tourism — Vineyards, tastings</option>
                    <option value="beer">Beer Tourism — Breweries, pubs</option>
                    <option value="coffee">Coffee Tourism — Origins, cafes</option>
                    <option value="shopping">Shopping — Markets, outlets, fashion</option>
                    <option value="art">Art Tourism — Galleries, installations</option>
                    <option value="music">Music Tourism — Concerts, festivals</option>
                    <option value="festival">Festival Hopping — Events, celebrations</option>
                    <option value="nightlife">Nightlife — Clubs, bars, parties</option>
                    <option value="wellness">Wellness/Spa — Retreats, healing</option>
                    <option value="yoga-retreat">Yoga/Meditation Retreat — Spiritual</option>
                    <option value="volunteering">Voluntourism — Giving back</option>
                    <option value="educational">Educational — Learning, courses</option>
                    <option value="photography">Photography — Capturing beauty</option>
                  </optgroup>
                  <optgroup label="Destination Type">
                    <option value="beach">Beach — Resort, praia, relaxar</option>
                    <option value="tropical-island">Tropical Island — Paradise, palm trees</option>
                    <option value="all-inclusive">All-Inclusive Resort — Everything included</option>
                    <option value="city">City Explorer — Cidades, urbano, nightlife</option>
                    <option value="capital-cities">Capital Cities — Major cities only</option>
                    <option value="off-beaten-path">Off the Beaten Path — Hidden gems</option>
                    <option value="small-towns">Small Towns — Local, authentic</option>
                    <option value="countryside">Countryside — Rural, peaceful</option>
                    <option value="mountain">Mountain — Altitude, views</option>
                    <option value="desert">Desert — Sand, extreme, unique</option>
                    <option value="arctic">Arctic/Antarctic — Cold, remote</option>
                    <option value="rainforest">Rainforest/Jungle — Biodiversity</option>
                    <option value="national-parks">National Parks — Nature preserved</option>
                  </optgroup>
                  <optgroup label="Travel Style">
                    <option value="road-trip">Road Trip — Carro, estrada, flexível</option>
                    <option value="train">Train Travel — Scenic railways</option>
                    <option value="cruise">Cruise — Cruzeiros, tudo incluído</option>
                    <option value="river-cruise">River Cruise — Intimate, scenic</option>
                    <option value="expedition-cruise">Expedition Cruise — Adventure at sea</option>
                    <option value="sailing">Sailing — Wind-powered, freedom</option>
                    <option value="motorcycle">Motorcycle — Two wheels, freedom</option>
                    <option value="bicycle">Bicycle Touring — Slow, immersive</option>
                    <option value="group-tour">Group Tour — Organized, social</option>
                    <option value="private-tour">Private Tour — Exclusive, personalized</option>
                    <option value="self-guided">Self-Guided — Independent, flexible</option>
                    <option value="spontaneous">Spontaneous — No plans, go with flow</option>
                    <option value="meticulously-planned">Meticulously Planned — Every detail</option>
                    <option value="slow-travel">Slow Travel — Extended stays, immersion</option>
                    <option value="speed-travel">Speed Travel — Many places, little time</option>
                    <option value="digital-nomad">Digital Nomad — Work while traveling</option>
                    <option value="gap-year">Gap Year — Extended world travel</option>
                    <option value="weekend-trips">Weekend Trips — Short escapes</option>
                    <option value="staycation">Staycation — Local tourism</option>
                    <option value="homebody">Homebody — Prefere ficar em casa</option>
                  </optgroup>
                  <optgroup label="Social Style">
                    <option value="solo">Solo Travel — Independent, self-discovery</option>
                    <option value="couple">Couples Travel — Romantic getaways</option>
                    <option value="family">Family Travel — Kid-friendly</option>
                    <option value="friends">Friend Groups — Social adventures</option>
                    <option value="girls-trip">Girls Trip — Female bonding</option>
                    <option value="guys-trip">Guys Trip — Male bonding</option>
                    <option value="meeting-locals">Meeting Locals — Authentic connections</option>
                    <option value="avoiding-tourists">Avoiding Tourists — Local experience</option>
                  </optgroup>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Frequência Ideal</label>
                <select value={data.preferences?.travelFrequency || ''} onChange={(e) => update('preferences', 'travelFrequency', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]">
                  <option value="">-- Selecione --</option>
                  <option value="homebody">Homebody — Raramente/nunca viaja</option>
                  <option value="occasional">Occasional — 1x por ano ou menos</option>
                  <option value="regular">Regular — Algumas vezes por ano</option>
                  <option value="frequent">Frequent — Viaja bastante</option>
                  <option value="constant">Constant — Sempre viajando</option>
                  <option value="nomad">Digital Nomad — Vida nômade</option>
                </select>
              </div>
            </div>
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Favorite/Dream Destinations</label>
              <input type="text" value={data.preferences?.travelDestinations || ''} onChange={(e) => update('preferences', 'travelDestinations', e.target.value)} placeholder="Ex: Japão, Itália, Nova York, Patagônia..." className="w-full bg-white border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]" />
            </div>
          </div>
        </div>

        {/* PERSONAL TENDENCIES */}
        <div className="border-2 border-violet-200 rounded-sm p-4 bg-violet-50/30">
          <h4 className="font-mono text-sm font-bold text-violet-800 mb-3">🎚️ Tendências Pessoais</h4>

          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Rotina vs Espontaneidade</label>
              <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>📅 Routine</span><span>🎲 Spontaneous</span></div>
              <input type="range" min="1" max="9" value={data.preferences?.routineSpontaneity || 5} onChange={(e) => update('preferences', 'routineSpontaneity', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-blue-400 to-yellow-400 rounded-lg appearance-none cursor-pointer" />
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Planejamento vs Improviso</label>
              <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>📋 Planner</span><span>🌊 Go with Flow</span></div>
              <input type="range" min="1" max="9" value={data.preferences?.planningImproving || 5} onChange={(e) => update('preferences', 'planningImproving', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-green-400 to-orange-400 rounded-lg appearance-none cursor-pointer" />
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Qualidade vs Quantidade</label>
              <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>💎 Quality</span><span>📦 Quantity</span></div>
              <input type="range" min="1" max="9" value={data.preferences?.qualityQuantity || 5} onChange={(e) => update('preferences', 'qualityQuantity', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-purple-400 to-teal-400 rounded-lg appearance-none cursor-pointer" />
            </div>

            <div>
              <label className="font-mono text-[10px] text-gray-600 mb-1 block">Nostalgia vs Novidade</label>
              <div className="flex justify-between font-mono text-[9px] text-gray-400"><span>📼 Nostalgic</span><span>🚀 Early Adopter</span></div>
              <input type="range" min="1" max="9" value={data.preferences?.oldNew || 5} onChange={(e) => update('preferences', 'oldNew', parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-amber-400 to-cyan-400 rounded-lg appearance-none cursor-pointer" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Sweet vs Savory</label>
                <select value={data.preferences?.sweetSavory || ''} onChange={(e) => update('preferences', 'sweetSavory', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]">
                  <option value="">-- Selecione --</option>
                  <option value="sweet">🍰 Sweet — Prefere doces</option>
                  <option value="savory">🧀 Savory — Prefere salgados</option>
                  <option value="both">Both — Ama os dois igualmente</option>
                  <option value="depends">Depends — Varia com o humor</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-[10px] text-gray-600 mb-1 block">Hot vs Cold Drinks</label>
                <select value={data.preferences?.hotCold || ''} onChange={(e) => update('preferences', 'hotCold', e.target.value)} className="w-full bg-white border border-gray-200 rounded-sm py-1.5 px-2 font-mono text-[10px]">
                  <option value="">-- Selecione --</option>
                  <option value="hot">☕ Hot — Prefere bebidas quentes</option>
                  <option value="cold">🧊 Cold — Prefere bebidas geladas</option>
                  <option value="both">Both — Depende da situação</option>
                  <option value="room-temp">Room Temp — Temperatura ambiente</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  };

  return sections[subtab] || sections[0];
};

// ============================================================================
// HISTORY CONTENT - Complete Implementation
// ============================================================================

export default FavoritesContent;
