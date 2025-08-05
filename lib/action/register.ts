"use server";

import { z } from "zod";
import { prisma } from "../prisma";
import { SignUpSchema, SignUpSchemaType } from "../schemas";
import { hashPassword } from "../auth";

export async function registerUser(data: SignUpSchemaType) {
  
    const validationResult = SignUpSchema.safeParse(data);
    
    if (!validationResult.success) { 
      return {
        success: false,
        error: "Invalid data provided.",
        issues: z.treeifyError(validationResult.error),
      }
    }
  
    const { email, password, name } = validationResult.data;
    try {
  
      const existingUser = await prisma.user.findUnique({
        where: {
          email
        }
      });
  
      if (existingUser) {
        return {
          success: false,
          error: "An account with this email already exists."
        }
      }
  
      const hashed_password = await hashPassword(password);
  
      const newUser = await prisma.user.create({
        data: {
          email: email,
          password: hashed_password,
          name: name || null,
          role: "user"
        }
      });
  
      const userWithoutPassword = {
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
      }
  
      return {
        success: true,
        user: userWithoutPassword
      }
    } catch (error) {
      console.log("Registration Server Action Error", error);
      return {
        success: false,
        error: "Could not create account. Please try again later."
      }
    }
  }