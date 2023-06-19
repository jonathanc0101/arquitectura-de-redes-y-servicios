import { CommonRoutesConfig } from "../common/common.routes.config";
import UsersController from "./controllers/users.controller";
import BooksController from "../books/controllers/books.controller";
import UsersMiddleware from "./middleware/users.middleware";
import jwtMiddleware from "../auth/middleware/jwt.middleware";
import permissionMiddleware from "../common/middleware/common.permission.middleware";
import { PermissionFlag } from "../common/middleware/common.permissionflag.enum";
import BodyValidationMiddleware from "../common/middleware/body.validation.middleware";
import { body } from "express-validator";

import express from "express";
import booksMiddleware from "../books/middleware/books.middleware";

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UsersRoutes");
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/users`)
      .get(UsersController.listUsers)
      .post(
        body("email").isEmail(),
        body("password")
          .isLength({ min: 5 })
          .withMessage("Must include password (5+ characters)"),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        UsersMiddleware.validateSameEmailDoesntExist,
        UsersController.createUser
      );

    this.app.param(`userId`, UsersMiddleware.extractUserId);
    this.app
      .route(`/users/:userId`)
      .all(
        UsersMiddleware.validateUserExists,
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.onlySameUserOrAdminCanDoThisAction
      )
      .get(UsersController.getUserById)
      .delete(UsersController.removeUser);

    this.app
      .route(`/users/:userId`)
      .get([
        body("email").isEmail(),
        body("password")
          .isLength({ min: 5 })
          .withMessage("Must include password (5+ characters)"),
        body("firstName").isString(),
        body("lastName").isString(),
        body("permissionFlags").isInt(),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        UsersMiddleware.validateSameEmailBelongToSameUser,
        UsersMiddleware.userCantChangePermission,
        permissionMiddleware.permissionFlagRequired(
          PermissionFlag.FREE_PERMISSION
        ),
        UsersController.put,
      ]);

    this.app
      .route(`/users/:userId/books`)
      .get([BooksController.listBooks])
      .post([
        // jwtMiddleware.validJWTNeeded,
        // permissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        BooksController.createBook,
      ]);

    this.app.param(`bookId`, booksMiddleware.extractBookId);
    this.app
      .route(`/users/:userId/books/:bookId`)
      .put([BooksController.put])
      .patch([BooksController.patch])
      .delete([BooksController.removeBook]);

    this.app.patch(`/users/:userId`, [
      body("email").isEmail().optional(),
      body("password")
        .isLength({ min: 5 })
        .withMessage("Password must be 5+ characters")
        .optional(),
      body("firstName").isString().optional(),
      body("lastName").isString().optional(),
      body("permissionFlags").isInt().optional(),
      BodyValidationMiddleware.verifyBodyFieldsErrors,
      UsersMiddleware.validatePatchEmail,
      UsersMiddleware.userCantChangePermission,
      permissionMiddleware.permissionFlagRequired(
        PermissionFlag.PAID_PERMISSION
      ),
      UsersController.patch,
    ]);

    /**
     * This route does not currently require extra permissions.
     *
     * Please update it for admin usage in your own application!
     */
    this.app.put(`/users/:userId/permissionFlags/:permissionFlags`, [
      jwtMiddleware.validJWTNeeded,
      permissionMiddleware.onlySameUserOrAdminCanDoThisAction,
      permissionMiddleware.permissionFlagRequired(
        PermissionFlag.FREE_PERMISSION
      ),
      UsersController.updatePermissionFlags,
    ]);

    return this.app;
  }
}
