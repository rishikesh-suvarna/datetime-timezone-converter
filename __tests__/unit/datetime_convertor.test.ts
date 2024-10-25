import { datetimeConvertor } from '../../src/functions/datetime_convertor';

describe('datetimeConvertor', () => {
    it('should convert a given datetime string to the specified timezone', () => {
        const datetime = '2024-10-24T12:00:00Z';
        const timezone = 'Asia/Kolkata';
        const result = datetimeConvertor(datetime, timezone);
        expect(result.toISOString()).toBe('2024-10-24T17:30:00.000Z');
    });

    it('should throw an error if an invalid datetime string is provided', () => {
        const datetime = 'invalid-datetime';
        const timezone = 'Asia/Kolkata';
        expect(() => datetimeConvertor(datetime, timezone)).toThrow('An error occurred while converting the datetime to the specified timezone');
    });

    it('should throw an error if an invalid timezone is provided', () => {
        const datetime = '2023-10-01T12:00:00Z';
        const timezone = 'Invalid/Timezone';
        expect(() => datetimeConvertor(datetime, timezone)).toThrow('An error occurred while converting the datetime to the specified timezone');
    });

    it('should use the current date and time if datetime is not provided', () => {
        const timezone = 'Asia/Kolkata';
        const result = datetimeConvertor('', timezone);

        const now = new Date();
        const expected = new Intl.DateTimeFormat('en-US', { timeZone: timezone, hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).formatToParts(now);
        const expectedDateParts = expected.reduce((acc, part) => {
            if (part.type !== 'literal' && part.type !== 'dayPeriod') {
                acc[part.type] = part.value;
            }
            return acc;
        }, {} as Record<string, string>);
        const expectedDate = new Date(`${expectedDateParts.year}-${expectedDateParts.month}-${expectedDateParts.day}T${expectedDateParts.hour}:${expectedDateParts.minute}:${expectedDateParts.second}`);
        
        expect(result.toISOString()).toBe(expectedDate.toISOString());
    });
});