import mongoose, { Types } from 'mongoose';
import Enviroment from '../common/constants/enviroment.js';
import { User } from '../schemas/user.js';
import { PATIENT_TYPE } from '../common/constants/user-types.js';
import { ROLES } from '../common/constants/role.js';
import { UserModel } from '../models/user-model.js';

const dbConnection = async() => {
  try {
      await mongoose.connect(Enviroment.db_connection);
      //await createAdmin()
      console.log('DB Online');
  } catch (error) {
      console.log(error);
      throw new Error('An error has occured in the connection with DB');
  }
}

const createAdmin = async () => {
  const password = await UserModel.getHashedPasswrod('1234test')
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
    password,
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