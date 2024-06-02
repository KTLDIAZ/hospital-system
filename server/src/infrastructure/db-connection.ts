import mongoose, { Types } from 'mongoose';
import Enviroment from '../common/constants/enviroment.js';
import { User } from '../schemas/user.js';
import { PATIENT_TYPE } from '../common/constants/user-types.js';
import { ROLES } from '../common/constants/role.js';

const dbConnection = async() => {
  try {
      await mongoose.connect(Enviroment.db_connection);
      console.log('DB Online');
      //wait createAdmin()
  } catch (error) {
      console.log(error);
      throw new Error('An error has occured in the connection with DB');
  }
}

const createAdmin = async () => {
  await User.create({
    birthDate: new Date('1999-12-22'),
    audit: {
      createdBy: 'M DIAZ',
      creatorId: new Types.ObjectId(),
    },
    bloodType: 'O+',
    email: 'mdiaz@gmail.com',
    fullName: 'M DIAZ',
    isDisabled: false,
    identityDocument: 'test',
    password: '1234test',
    type: PATIENT_TYPE,
    roles: [
      {
        name: ROLES.ADMIN,
        audit: {
          createdBy: 'M DIAZ',
          creatorId: new Types.ObjectId()
        }
      }
    ]
  })
}

export default dbConnection