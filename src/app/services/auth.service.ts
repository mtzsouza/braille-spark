import { Injectable, inject, signal } from "@angular/core";
import { Observable, from } from "rxjs";;
import { UserInterface } from "../utils/user.interface";
import { FirestoreService } from "./firestore.service";
import { 
    Auth,
    User,
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    updateProfile, 
    user,
    updatePassword,
    sendPasswordResetEmail
} from "@angular/fire/auth"

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    firebaseAuth = inject(Auth)
    database = inject(FirestoreService);
    user$ = user(this.firebaseAuth);
    currentUserSig = signal<UserInterface | null | undefined>(undefined)

    register(email: string, username: string, password: string) : Observable<void> {
        const promise = createUserWithEmailAndPassword(
            // Register to Firebase Auth
            this.firebaseAuth, 
            email, 
            password
            ).then(response => updateProfile(response.user, {displayName: username,}))

            // Register to Firestore
            const userData = {
                admin: false,
                level: 1
            };
            this.database.addDocWithCustomId("users", userData, email);

            return from(promise);
    }

    login(email: string, password: string) : Observable<void> {
        const promise = signInWithEmailAndPassword(this.firebaseAuth,email,password).then(() => {});

        return from(promise);
    }

    logout(): Observable<void>{
        const promise = signOut(this.firebaseAuth);
        
        return from(promise);
    }

    getUsername(): string | null | undefined {
        return this.firebaseAuth.currentUser?.displayName;
    }

    getEmail(): string | null | undefined {
        return this.firebaseAuth.currentUser?.email;
    }

    async getLevel(): Promise<number> {
        const email = this.getEmail();
        if (typeof email === 'string') {
                try {
                    const data = await this.database.fetchDocumentById('users', email);
                    return Number(data.level);
                } catch (error) {
                    console.log("Error fetching level:", error);
                    return 0;
                }
        } else {
                console.log("Error fetching email");
                return 0;
        }
    }

    async levelUp(completedLevel: number | string): Promise<void> {
        const email = await this.getEmail();
        const currentLevel = await this.getLevel();
        const newLevel = Number(completedLevel) + 1;
        if (newLevel > currentLevel) {
            this.database.updateField('users', email!, 'level', newLevel)
        }
    }

    async isAdmin(): Promise<boolean> {
        const email = this.getEmail();
        if (typeof email === 'string') {
            try {
                const doc = await this.database.fetchDocumentById('users', email);
                return doc.admin;
            } catch (error) {
                console.error('Error fetching document:', error);
                return false;
            }
        }
        return false;
    }

    resetPassword(email: string): Observable<void> {
        const promise = sendPasswordResetEmail(this.firebaseAuth, email)
          .then(() => console.log('Password reset email sent'))
          .catch(error => console.error('Error sending password reset email:', error));
    
        return from(promise);
      }

    updateUsername(newUsername: string): Observable<void> {
        const user: User | null = this.firebaseAuth.currentUser;
        if (user) {
          const promise = updateProfile(user, { displayName: newUsername })
            .then(() => console.log('Username updated successfully'))
            .catch(error => console.error('Error updating username:', error));
    
          return from(promise);
        } else {
          return from(Promise.reject('No user is currently signed in'));
        }
      }

    updatePassword(newPassword: string): Observable<void> {
        const user: User | null = this.firebaseAuth.currentUser;
        if (user) {
        const promise = updatePassword(user, newPassword)
            .then(() => console.log('Password updated successfully'))
            .catch(error => console.error('Error updating password:', error));

        return from(promise);
        } else {
        return from(Promise.reject('No user is currently signed in'));
        }
    }
}