import { isValidTimezone } from '../utils/utils';

describe('isValidTimezone', () => {
    it('should return true for a valid timezone', () => {
        expect(isValidTimezone('Asia/Kolkata')).toBe(true);
    });

    it('should return false for an invalid timezone', () => {
        expect(isValidTimezone('Invalid/Timezone')).toBe(false);
    });

    it('should return true for another valid timezone', () => {
        expect(isValidTimezone('Europe/London')).toBe(true);
    });

    it('should return false for an empty string', () => {
        expect(isValidTimezone('')).toBe(false);
    });

    it('should return false for a numeric string', () => {
        expect(isValidTimezone('12345')).toBe(false);
    });

    it('should return false for a null value', () => {
        expect(isValidTimezone(null as any)).toBe(false);
    });

    it('should return false for an undefined value', () => {
        expect(isValidTimezone(undefined as any)).toBe(false);
    });
});