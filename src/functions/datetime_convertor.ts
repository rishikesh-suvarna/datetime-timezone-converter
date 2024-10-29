/**
 * Converts a given datetime string to a Date object in the specified timezone.
 *
 * @param datetime - The datetime string to be converted. If not provided, the UTC date and time will be used.
 * @param timezone - The timezone identifier (e.g., 'Asia/Kolkata, Europe/Londdon') to which the datetime should be converted.
 * @returns A Date object representing the converted datetime in the specified timezone.
 *
 */
export const datetimeConvertor = (datetime: string, timezone: string): Date => {
    try {
        // If datetime is not provided, we will take the UTC date and time
        const date = (datetime && datetime.length) ? new Date(datetime) : new Date();
    
        const formatter = new Intl.DateTimeFormat('en-US', { timeZone: timezone, hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const parts = formatter.formatToParts(date);
        
        // Sample parts
        // [
        //     { type: 'month', value: '10' },
        //     { type: 'literal', value: '/' },
        //     { type: 'day', value: '24' },
        //     { type: 'literal', value: '/' },
        //     { type: 'year', value: '2024' },
        //     { type: 'literal', value: ', ' },
        //     { type: 'hour', value: '05' },
        //     { type: 'literal', value: ':' },
        //     { type: 'minute', value: '30' },
        //     { type: 'literal', value: ':' },
        //     { type: 'second', value: '00' },
        //     { type: 'literal', value: ' ' },
        //     { type: 'dayPeriod', value: 'PM' }
        // ]
    
        const new_date_parts = parts.reduce((acc, part) => {
            if (part.type !== 'literal' && part.type !== 'dayPeriod') {
                acc[part.type] = part.value;
            }
            return acc;
        }, {} as Record<string, string>);
    
        return new Date(`${new_date_parts.year}-${new_date_parts.month}-${new_date_parts.day}T${new_date_parts.hour}:${new_date_parts.minute}:${new_date_parts.second}`);
    } catch (error) {
        throw new Error('An error occurred while converting the datetime to the specified timezone');
    }
};
