import { datetimeConvertor } from '../functions/datetime_convertor';

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
});