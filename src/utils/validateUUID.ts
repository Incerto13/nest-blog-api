import { BadRequestException } from '@nestjs/common';
import isUUID from 'validator/lib/isUUID';

const validateUUID = (id) => {
    const isValid = isUUID(id)
    
    if (!isValid) {
        throw new BadRequestException(` Invalid input syntax for type uuid: ${id}`);
    }
    return true
}

export default validateUUID