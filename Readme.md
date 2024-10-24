# DateTime Timezone Converter API

This project is an API for converting datetime values between different timezones. It is built for func.live and utilizes JavaScript's internal `Intl` functions to handle the conversions.

## Features

- Convert datetime values to different timezones.
- Accepts datetime in ISO string format.
- Defaults to the server's current date and time if no datetime is provided.

## API Endpoints

### Convert Datetime

**Endpoint:** `/functions/convert-datetime-tz`

**Method:** `POST`

**Example Request:**

```http
GET /functions/convert-datetime-tz
```

**Endpoint:** `/functions/convert-datetime-tz`

**Method:** `POST`

**Parameters:**

- `datetime` (optional): The datetime value in ISO string format. If not provided, the server's current date and time will be used.
- `timezone` (required): The target timezone for conversion.

**Example Request:**

```http
POST /functions/convert-datetime-tz
Content-Type: application/json

{
    "datetime": "2024-10-24T12:00:00Z",
    "timezone": "Asia/Kolkata"
}
```

**Example Response:**

```json
{
    "output": {
        "original_datetime": "2024-10-24T12:00:00Z",
        "converted_datetime": "2024-10-24T17:30:00.000Z"
    }
}
```

## Installation

1. Clone the repository:
        ```sh
        git clone https://github.com/rishikesh-suvarna/datetime-timezone-converter.git
        ```
2. Navigate to the project directory:
        ```sh
        cd datetime-timezone-converter
        ```
3. Install dependencies:
        ```sh
        npm install
        ```

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:

- `PORT`: The port number on which the server will run. Default is `3000`.
- `TZ`: The default timezone to use if none is provided in the request. Example: `UTC`.

Example `.env` file:

```env
PORT=9090
TZ=UTC
```

## Usage

Start the server:
```sh
npm start
```

The API will be available at `http://localhost:9090`.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## Contact

For any questions or inquiries, please contact [rishikeshsuvarna@gmail.com](mailto:rishikeshsuvarna@gmail.com).
