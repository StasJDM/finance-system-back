import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/modules/users/user.entity';
import { DEVELOPMENT, PRODUCTION, SEQUELIZE, TEST } from '../constants';
import { databaseConfig } from './database.config';

export const databaseProvider = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
      }
      console.log(config);
      const sequelize = new Sequelize(config);
      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
