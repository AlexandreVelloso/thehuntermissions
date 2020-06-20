import { createContainer, asClass, Lifetime, AwilixContainer } from 'awilix';

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

function createAppContainer(): AwilixContainer {
    const container = createContainer();
    const opts = {
        lifetime: Lifetime.SINGLETON
    };

    container.register({
        animalController: asClass(AnimalController, opts),
        authController: asClass(AuthController, opts),
        forgotPasswordController: asClass(ForgotPasswordController, opts),
        lastMissionController: asClass(LastMissionController, opts),
        missionController: asClass(MissionController, opts),
        objectiveController: asClass(ObjectiveController, opts),
        weaponController: asClass(WeaponController, opts),

        animalService: asClass(AnimalServiceImpl, opts),
        authService: asClass(AuthServiceImpl, opts),
        forgorPasswordService: asClass(ForgotPasswordServiceImpl, opts),
        lastMissionService: asClass(LastMissionServiceImpl, opts),
        missionService: asClass(MissionServiceImpl, opts),
        objectiveService: asClass(ObjectiveServiceImpl, opts),
        startWeaponsService: asClass(StartWeaponsServiceImpl, opts),
        weaponService: asClass(WeaponServiceImpl, opts),

        animalRepository: asClass(AnimalRepositoryImpl, opts),
        missionRepository: asClass(MissionRepositoryImpl, opts),
        objectiveRepository: asClass(ObjectiveRepositoryImpl, opts),
        sendResetEmailService: asClass(SendResetEmailServiceImpl, opts),
        userRepository: asClass(UserRepositoryImpl, opts),
        userObjectiveRepository: asClass(UserObjectiveRepositoryImpl, opts),
        userWeaponRepository: asClass(UserWeaponRepositoryImpl, opts),
        weaponRepository: asClass(WeaponRepositoryImpl, opts),
    });

    return container;
}

export default createAppContainer;