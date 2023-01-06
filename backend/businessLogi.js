module.exports = {
    generateShortUrl : (longUrl) => {
        // Hash the long URL to create a unique short URL
        const hash = crypto.createHash('sha256');
        hash.update(longUrl);
        const shortUrl = hash.digest('hex').substring(0, 6);
    
        // Return the short URL
        return shortUrl;
    }
}
   

