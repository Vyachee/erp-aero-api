import { Request, Response } from "express";
import User from "@/models/User";

export type RequestWithUser = Request & { user?: User };
