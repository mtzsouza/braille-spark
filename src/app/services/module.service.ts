import { Injectable, inject } from "@angular/core";
import { FirestoreService } from "./firestore.service";
import { ModuleInterface } from "../utils/module.interface";

@Injectable({
    providedIn: 'root'
})
export class ModuleService {
    database = inject(FirestoreService);

    async getModules(): Promise<any[]> {
        try {
            const collection = await this.database.fetchCollection('modules')
            return collection;
        } catch (error) {
            console.error('Error fetching collection:', error);
            return [];
        }
    }

    addModule(module: ModuleInterface): void {
        const moduleId = this.database.addDocument('modules', module).then(moduleId => {
            console.log("Module ID:", moduleId)
            this.database.updateField('modules', moduleId, "id", moduleId);
            alert("Module added successfully.")
            location.reload();
        })
        .catch(error => {
            console.error("Failed to add module:", error);
        })
    }

    deleteModule(moduleId: string): void {
        try {
            if (confirm("Are you sure you want to delete this module?")) {
                this.database.deleteDocument('modules', moduleId);
                alert("Module deleted successfully.");
            }
        } catch (error) {
            console.error('Error deleting module:', error);
        }
    }
}