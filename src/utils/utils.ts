
/**
 * Checks if a given timezone is a valid timezone identifier.
 *
 * @param timezone - The timezone identifier to be validated.
 * @returns A boolean indicating whether the timezone is valid.
 *
 */
export const isValidTimezone = (timezone: string): boolean => {
    try {
        if(!timezone) return false;
        Intl.DateTimeFormat('en-US', { timeZone: timezone });
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Checks if a given datetime string is a valid ISO datetime string.
 *
 * @param datetime - The datetime string to be validated.
 * @returns A boolean indicating whether the datetime string is valid.
 *
 */
export const isValidISODateTimeString = (datetime: string): boolean => {
    if(!datetime) return false;
    return new Date(datetime).getDate() ? true : false;
}