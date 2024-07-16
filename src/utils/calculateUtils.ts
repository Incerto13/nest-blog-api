import * as crypto from "crypto";

const calculateUtils = (
    url: string,
    options: Record<string, any>,
): string => {
    return crypto
        .createHash('sha256')
        .update(url + JSON.stringify(options))
        .digest('hex');
}

export default calculateUtils;