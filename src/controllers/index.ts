import { NextFunction, Request, Response, RequestHandler } from "express";
import { datetimeConvertor } from "../functions/datetime_convertor";
import { isValidISODateTimeString, isValidTimezone } from "../utils/utils";
import logger from "../utils/logger";

/**
 * Controller to convert the given datetime to the specified timezone
 * @endpoint: /functions/convertDatetimeToAnotherTz
 * @method: POST
 */
export const datetimeConversionController: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        logger.info('POST /functions/convertDatetimeToAnotherTz');
        const { input: { datetime, timezone } } = req.body;

        // Validating inputs
        if (!timezone) {
            logger.error('Invalid input, Please check the provided data');
            res.status(400).json({ message: 'Invalid input, Please check the provided data' });
            return;
        }
        if(datetime && !isValidISODateTimeString(datetime)) {
            logger.error('Invalid datetime, Please provide a valid ISO datetime string');
            res.status(400).json({ message: 'Invalid datetime, Please provide a valid ISO datetime string' });
            return;
        }
        if(!isValidTimezone(timezone)) {
            logger.error('Invalid timezone, Please provide a valid timezone refer: https://worldtimeapi.org/timezones');
            res.status(400).json({ message: 'Invalid timezone, Please provide a valid timezone refer: https://worldtimeapi.org/timezones' });
            return;
        }

        // Converting datetime to the specified timezone
        const new_date = datetimeConvertor(datetime, timezone);

        // Return the response
        res.status(200).json({
            "output": {
                "status": "success",
                "message": `The datetime ${datetime ? datetime : new Date().toISOString()} is converted to ${new_date.toISOString()} in the timezone ${timezone}`,
                "timestamp": new Date().toISOString(),
                "original_datetime": datetime,
                "timezone": timezone,
                "converted_datetime": new_date.toISOString(),
                "date": new_date.toDateString(),
                "time": new_date.toLocaleTimeString(),
                "day": new_date.toLocaleDateString(undefined, { weekday: 'long' }),
            }
        });
        return;
    } catch (error: Error | any) {
        console.error(error);
        logger.error(error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
        return;
    }
};

/**
 * Controller to provide the description of the datetime conversion function
 * @endpoint: /functions/convertDatetimeToAnotherTz
 * @method: GET
 * @todo: Add more details to the description for func.live
 */
export const datetimeConversionDesriptionController: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        logger.info('GET /functions/convertDatetimeToAnotherTz');
        res.status(200).json({
            "name": "convertDatetimeToAnotherTz",
            "description": "This func converts the given datetime to the specified timezone and utilizes JavaScript's internal `Intl` functions to handle the conversions, if no datetime is provided then it will convert the UTC datetime to the specified timezone. The timezone should be a valid timezone string refer: https://worldtimeapi.org/timezones. The datetime should be a valid ISO datetime string. The code is written in TypeScript and the API is built using Express.js and tested using Jest and Supertest. The code is available on My GitHub: https://github.com/rishikesh-suvarna/datetime-timezone-converter",
            "input": {
                "datetime": {
                    "type": "string",
                    "description": "The datetime to be converted to the specified timezone in ISO format",
                    "example": "2024-10-24T12:00:00Z"
                },
                "timezone": {
                    "type": "string",
                    "description": "The timezone to which the datetime should be converted, refer: https://worldtimeapi.org/timezones",
                    "example": "Asia/Kolkata"
                }
            },
            "output": {
                "status": {
                    "type": "string",
                    "description": "The status of the response",
                    "example": "success"
                },
                "message": {
                    "type": "string",
                    "description": "The message describing the conversion",
                    "example": "The datetime 2024-10-24T12:00:00Z is converted to 2024-10-24T17:30:00Z in the timezone Asia/Kolkata"
                },
                "timestamp": {
                    "type": "string",
                    "description": "The timestamp of the response",
                    "example": "2024-10-24T12:00:00Z"
                },
                "timezone": {
                    "type": "string",
                    "description": "The timezone to which the datetime is converted",
                    "example": "Asia/Kolkata"
                },
                "original_datetime": {
                    "type": "string",
                    "description": "The original datetime string provided in the input or the UTC datetime if not provided in ISO format",
                    "example": "2024-10-24T12:00:00Z"
                },
                "converted_datetime": {
                    "type": "string",
                    "description": "The converted datetime string in the specified timezone in ISO format",
                    "example": "2024-10-24T17:30:00Z"
                },
                "date": {
                    "type": "string",
                    "description": "The date part of the converted datetime",
                    "example": "Mon Oct 24 2024"
                },
                "time": {
                    "type": "string",
                    "description": "The time part of the converted datetime",
                    "example": "5:30:00 PM"
                },
                "day": {
                    "type": "string",
                    "description": "The day of the week of the converted datetime",
                    "example": "Thursday"
                }
            }
        });
        return;
    } catch (error: Error | any) {
        console.error(error);
        logger.error(error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
        return;
    }
};