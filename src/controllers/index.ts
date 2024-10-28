import { NextFunction, Request, Response, RequestHandler } from "express";
import { datetimeConvertor } from "../functions/datetime_convertor";
import { isValidISODateTimeString, isValidTimezone } from "../utils/utils";

/**
 * Controller to convert the given datetime to the specified timezone
 * @endpoint: /functions/convert-datetime-tz
 * @method: POST
 */
export const datetimeConversionController: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { input: { datetime, timezone } } = req.body;

        // Validating inputs
        if (!timezone) {
            res.status(400).json({ message: 'Invalid input, Please check the provided data' });
            return;
        }
        if(datetime && !isValidISODateTimeString(datetime)) {
            res.status(400).json({ message: 'Invalid datetime, Please provide a valid ISO datetime string' });
            return;
        }
        if(!isValidTimezone(timezone)) {
            res.status(400).json({ message: 'Invalid timezone, Please provide a valid timezone refer: https://worldtimeapi.org/timezones' });
            return;
        }

        // Converting datetime to the specified timezone
        const new_date = datetimeConvertor(datetime, timezone);

        // Return the response
        res.status(200).json({
            "output": {
                "original_datetime": datetime,
                "converted_datetime": new_date.toISOString(),
            }
        });
        return;
    } catch (error: Error | any) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
        return;
    }
};

/**
 * Controller to provide the description of the datetime conversion function
 * @endpoint: /functions/convert-datetime-tz
 * @method: GET
 * @todo: Add more details to the description for func.live
 */
export const datetimeConversionDesriptionController: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({
            "name": "convert-datetime-tz",
            "description": "This func converts the given datetime to the specified timezone and utilizes JavaScript's internal `Intl` functions to handle the conversions, if no datetime is provided then it will convert the current UTC datetime to the specified timezone. The timezone should be a valid timezone string refer: https://worldtimeapi.org/timezones. The datetime should be a valid ISO datetime string. The code is written in TypeScript and the API is built using Express.js and tested using Jest and Supertest. The code is available on My GitHub: https://github.com/rishikesh-suvarna/datetime-timezone-converter",
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
                "original_datetime": {
                    "type": "string",
                    "description": "The original datetime string provided in the input",
                    "example": "2024-10-24T12:00:00Z"
                },
                "converted_datetime": {
                    "type": "string",
                    "description": "The converted datetime string in the specified timezone",
                    "example": "2024-10-24T17:30:00Z"
                }
            }
        });
        return;
    } catch (error: Error | any) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
        return;
    }
};