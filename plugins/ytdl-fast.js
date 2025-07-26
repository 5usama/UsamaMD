const config = require('../config');
const { cmd } = require('../command');
const { ytsearch } = require('@dark-yasiya/yt-dl.js');

// MP4 video download
cmd({ 
    pattern: "video", 
    alias: ["video", "video"], 
    react: "🎥", 
    desc: "Download Youtube song", 
    category: "main", 
    use: '.song < Yt url or Name >', 
    filename: __filename 
}, async (conn, mek, m, { from, prefix, quoted, q, reply }) => { 
    try { 
        if (!q) return await reply("Please provide a YouTube URL or song name.");
        
        const yt = await ytsearch(q);
        if (yt.results.length < 1) return reply("No results found!");
        
        let yts = yt.results[0];  
        let apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(yts.url)}`;
        
        let response = await fetch(apiUrl);
        let data = await response.json();
        
        if (data.status !== 200 || !data.success || !data.result.download_url) {
            return reply("Failed to fetch the video. Please try again later.");
        }
        
        let ytmsg = `🎞️ UsamaMD YT VIDEO DOWNLOADER 🎞️
        
╭━━❐━⪼
┇๏ Title -  ${yts.title}
┇๏ Duration - ${yts.timestamp}
┇๏ Views -  ${yts.views}
┇๏ Author -  ${yts.author.name}
╰━━❑━⪼`;

        await conn.sendMessage(from, { image: { url: data.result.thumbnail || '' }, caption: ytmsg }, { quoted: mek });
        
        await conn.sendMessage(from, { video: { url: data.result.download_url }, mimetype: "video/mp4" }, { quoted: mek });
        
        await conn.sendMessage(from, { 
            document: { url: data.result.download_url }, 
            mimetype: "video/mp4", 
            fileName: `${data.result.title}.mp4`, 
            caption: `> *${yts.title}*\n> *© Pᴏᴡᴇʀᴇᴅ Bʏ UsamaMD ♡*`
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply("An error occurred. Please try again later.");
    }
});

cmd({ 
    pattern: "play", 
    alias: ["play", "play"], 
    react: "🎶", 
    desc: "Download Youtube song",
    category: "main", 
    use: '.song < Yt url or Name >', 
    filename: __filename 
}, async (conn, mek, m, { from, prefix, quoted, q, reply }) => { 
    try { 
        if (!q) return await reply("Please provide a YouTube URL or song name.");

        const yt = await ytsearch(q);
        if (yt.results.length < 1) return reply("No results found!");
        
        let yts = yt.results[0];  
        let apiUrl = `https://apis.davidcyriltech.my.id/youtube/mp3?url=${encodeURIComponent(yts.url)}`;
        
        let response = await fetch(apiUrl);
        let data = await response.json();
        
        if (data.status !== 200 || !data.success || !data.result.downloadUrl) {
            return reply("Failed to fetch the audio. Please try again later.");
        }
        
        let ytmsg = `🎧 UsamaMD YT MP3 DOWNLOADER 🎧
        
╭━━❐━⪼
┇๏ Title -  ${yts.title}
┇๏ Duration - ${yts.timestamp}
┇๏ Views -  ${yts.views}
┇๏ Author -  ${yts.author.name} 
╰━━❑━⪼
> © Pᴏᴡᴇʀᴇᴅ Bʏ UsamaMD ♡`;

        await conn.sendMessage(from, { image: { url: data.result.image || '' }, caption: ytmsg }, { quoted: mek });
        
        await conn.sendMessage(from, { audio: { url: data.result.downloadUrl }, mimetype: "audio/mpeg" }, { quoted: mek });
        
        await conn.sendMessage(from, { 
            document: { url: data.result.downloadUrl }, 
            mimetype: "audio/mpeg", 
            fileName: `${data.result.title}.mp3`, 
            caption: `> *© Pᴏᴡᴇʀᴇᴅ Bʏ UsamaMD ♡*`
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply("An error occurred. Please try again later.");
    }
});
