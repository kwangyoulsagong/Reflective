"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../authorization/jwt");
const express_1 = require("express");
const rankingController_1 = __importDefault(require("../controller/rankingController"));
const router = (0, express_1.Router)();
router.get("/", jwt_1.verifyTokenMiddleware, rankingController_1.default.getUserRank);
exports.default = router;
