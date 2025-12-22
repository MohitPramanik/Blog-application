export function formatTimeToPeriod(dateString: string) {
    const now: Date = new Date();
    const pastDate: Date = new Date(dateString);
    // Ensure the date is valid. The year '025' might be ambiguous, 
    // but JS will treat it relative to the current century if not specified.
    if (isNaN(pastDate.getTime())) {
        return "Invalid date";
    }

    const secondsAgo: number = Math.floor((now.getTime() - pastDate.getTime()) / 1000);

    let interval = secondsAgo / 31536000; // seconds in a year
    if (interval > 1) {
        return Math.floor(interval) + " year" + (Math.floor(interval) === 1 ? "" : "s") + " ago";
    }
    interval = secondsAgo / 2592000; // seconds in a month (approx)
    if (interval > 1) {
        return Math.floor(interval) + " month" + (Math.floor(interval) === 1 ? "" : "s") + " ago";
    }
    interval = secondsAgo / 86400; // seconds in a day
    if (interval > 1) {
        return Math.floor(interval) + " day" + (Math.floor(interval) === 1 ? "" : "s") + " ago";
    }
    interval = secondsAgo / 3600; // seconds in an hour
    if (interval > 1) {
        return Math.floor(interval) + " hour" + (Math.floor(interval) === 1 ? "" : "s") + " ago";
    }
    interval = secondsAgo / 60; // seconds in a minute
    if (interval > 1) {
        return Math.floor(interval) + " minute" + (Math.floor(interval) === 1 ? "" : "s") + " ago";
    }
    return Math.floor(secondsAgo) + " second" + (Math.floor(secondsAgo) === 1 ? "" : "s") + " ago";
}
