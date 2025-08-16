import { Credential } from "./credentials";

interface FoodBuddieUser {
    medical_schedule: string[],
    medical_preference: string[],
    allergy_preference: string[],
    dietary_preference: string[],
}

interface FoodBuddieUserInCredential {
    // Many Credential to one FoodBuddieUser
    credential: Credential,
    user: FoodBuddieUser
}