import { NextFunction, Request, Response, RequestHandler } from "express";
import { datetimeConvertor } from "../functions/datetime_convertor";
import { isValidISODateTimeString, isValidTimezone } from "../utils";

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
            "description": "This function converts the given datetime to the specified timezone",
            "input": {
                "datetime": "ISO datetime string (optional)",
                "timezone": "Timezone string (required)"
            }
        });
        return;
    } catch (error: Error | any) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
        return;
    }
};