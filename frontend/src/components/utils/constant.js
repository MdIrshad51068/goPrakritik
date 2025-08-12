import dotenv from 'dotenv'

dotenv.config({});

export const USER_API_END_POINT=`${process.env.RENDER}/api/v1/user`;
export const JOB_API_END_POINT=`${process.env.RENDER}/api/v1/job`;
export const APPLICATION_API_END_POINT=`${process.env.RENDER}/api/v1/application`;

