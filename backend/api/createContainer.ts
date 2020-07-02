import { createContainer, asClass, Lifetime, AwilixContainer, asValue } from 'awilix';

import AnimalController from './Controllers/AnimalController';
import AnimalServiceImpl from './Services/impl/AnimalServiceImpl';
import AnimalRepositoryImpl from './Repositories/impl/AnimalRepositoryImpl';
import AuthServiceImpl from './Services/impl/AuthServiceImpl';
import ForgotPasswordServiceImpl from './Services/impl/ForgotPasswordServiceImpl';
import LastMissionServiceImpl from './Services/impl/LastMissionServiceImpl';
import MissionServiceImpl from './Services/impl/MissionServiceImpl';
import ObjectiveServiceImpl from './Services/impl/ObjectiveServiceImpl';
import WeaponServiceImpl from './Services/impl/WeaponServiceImpl';
import MissionRepositoryImpl from './Repositories/impl/MissionRepositoryImpl';
import ObjectiveRepositoryImpl from './Repositories/impl/ObjectiveRepositoryImpl';
import UserRepositoryImpl from './Repositories/impl/UserRepositoryImpl';
import UserWeaponRepositoryImpl from './Repositories/impl/UserWeaponRepositoryImpl';
import WeaponRepositoryImpl from './Repositories/impl/WeaponRepositoryImpl';
import AuthController from './Controllers/AuthController';
import ForgotPasswordController from './Controllers/ForgotPasswordController';
import LastMissionController from './Controllers/LastMissionController';
import MissionController from './Controllers/MissionController';
import ObjectiveController from './Controllers/ObjectiveController';
import WeaponController from './Controllers/WeaponController';
import StartWeaponsServiceImpl from './Services/impl/StartWeaponsServiceImpl';
import UserObjectiveRepositoryImpl from './Repositories/impl/UserObjectiveRepositoryImpl';
import SendResetEmailServiceImpl from './Services/impl/SendResetEmailServiceImpl';
import CacheServiceImpl from './Services/impl/CacheServiceImpl';
import GetValidator from './Validators/GetValidator';
import UpdateMissionValidator from './Validators/UpdateMissionValidator';
import UpdateObjectiveValidator from './Validators/UpdateObjectiveValidator';
import UpdateWeaponValidator from './Validators/UpdateWeaponValidator';
import AuthLoginValidator from './Validators/AuthLoginValidator';
import AuthRegisterValidator from './Validators/AuthRegisterValidator';
import AuthResetPasswordValidator from './Validators/AuthResetPasswordValidator';
import AuthRefreshTokenValidator from './Validators/AuthRefreshTokenValidator';
import ForgotPasswordValidator from './Validators/ForgotPasswordValidator';
import EquipamentController from './Controllers/EquipamentController';
import EquipamentServiceImpl from './Services/impl/EquipamentServiceImpl';
import EquipamentRepositoryImpl from './Repositories/impl/EquipamentRepositoryImpl';
import UserEquipamentRepositoryImpl from './Repositories/impl/UserEquipamentRepositoryImpl';
import UpdateEquipamentValidator from './Validators/UpdateEquipamentValidator';
import StartEquipamentsServiceImpl from './Services/impl/StartEquipamentsServiceImpl';

function createAppContainer(): AwilixContainer {
    const container = createContainer();
    const opts = {
        lifetime: Lifetime.SINGLETON
    };
    const HOUR = 60 * 60;
    const DAY = HOUR * 24;

    container.register({
        animalController: asClass(AnimalController, opts),
        authController: asClass(AuthController, opts),
        forgotPasswordController: asClass(ForgotPasswordController, opts),
        lastMissionController: asClass(LastMissionController, opts),
        missionController: asClass(MissionController, opts),
        objectiveController: asClass(ObjectiveController, opts),
        weaponController: asClass(WeaponController, opts),
        equipamentController: asClass(EquipamentController, opts),

        animalService: asClass(AnimalServiceImpl, opts),
        authService: asClass(AuthServiceImpl, opts),
        cacheService: asClass(CacheServiceImpl, opts),
        forgorPasswordService: asClass(ForgotPasswordServiceImpl, opts),
        lastMissionService: asClass(LastMissionServiceImpl, opts),
        missionService: asClass(MissionServiceImpl, opts),
        objectiveService: asClass(ObjectiveServiceImpl, opts),
        startWeaponsService: asClass(StartWeaponsServiceImpl, opts),
        weaponService: asClass(WeaponServiceImpl, opts),
        equipamentService: asClass(EquipamentServiceImpl, opts),
        startEquipamentsService: asClass(StartEquipamentsServiceImpl, opts),

        animalRepository: asClass(AnimalRepositoryImpl, opts),
        missionRepository: asClass(MissionRepositoryImpl, opts),
        objectiveRepository: asClass(ObjectiveRepositoryImpl, opts),
        sendResetEmailService: asClass(SendResetEmailServiceImpl, opts),
        userRepository: asClass(UserRepositoryImpl, opts),
        userObjectiveRepository: asClass(UserObjectiveRepositoryImpl, opts),
        userWeaponRepository: asClass(UserWeaponRepositoryImpl, opts),
        weaponRepository: asClass(WeaponRepositoryImpl, opts),
        equipamentRepository: asClass(EquipamentRepositoryImpl, opts),
        userEquipamentRepository: asClass(UserEquipamentRepositoryImpl, opts),

        getValidator: asClass(GetValidator, opts),
        updateMissionsValidator: asClass(UpdateMissionValidator, opts),
        updateObjectiveValidator: asClass(UpdateObjectiveValidator, opts),
        updateWeaponValidator: asClass(UpdateWeaponValidator, opts),
        authLoginValidator: asClass(AuthLoginValidator, opts),
        authRegisterValidator: asClass(AuthRegisterValidator, opts),
        authResetPasswordValidator: asClass(AuthResetPasswordValidator, opts),
        authRefreshTokenValidator: asClass(AuthRefreshTokenValidator, opts),
        forgotPasswordValidator: asClass(ForgotPasswordValidator, opts),
        updateEquipamentValidator: asClass(UpdateEquipamentValidator, opts),

        ttlSeconds: asValue(DAY * 7),
    });

    return container;
}

export default createAppContainer;