import { Injectable, inject } from "@angular/core";
import { FirestoreService } from "./firestore.service";
import { ModuleInterface } from "../utils/module.interface";

@Injectable({
    providedIn: 'root'
})
export class ModuleService {
    database = inject(FirestoreService);

    reload() {
        setTimeout(() => {
            location.reload();
        }, 1000);
    }

    async getModules(): Promise<any[]> {
        try {
            const collection = await this.database.fetchCollection('modules')
            return collection;
        } catch (error) {
            console.error('Error fetching modules:', error);
            return [];
        }
    }

    async getModuleById(id: string): Promise<ModuleInterface | null> {
        try {
            const module: ModuleInterface = await this.database.fetchDocumentById('modules', id)
            return module;
        } catch (error) {
            console.error('Error fetching module:', error);
            return null;
        }
    }

    addModule(module: ModuleInterface): void {
        this.getModules().then(data => {
            // Runs if there's at least one existent module
            const id = (Number(data[data.length - 1].id) + 1).toString(); // Grab id of last module and increment by 1
            this.database.addDocWithCustomId('modules', module, id).then(() => {
                this.database.updateField('modules', id, "id", id);
                alert("Module added successfully.")
                this.reload();
            })
        }).catch(error => {
            // Runs if this is the first module
            const id = '1';
            this.database.addDocWithCustomId('modules', module, id).then(() => {
                this.database.updateField('modules', id, "id", id);
                alert("Module added successfully.")
                this.reload();
            })
            .catch(error => {
                console.error("Failed to add module:", error);
            })
        });
    }

    deleteModule(moduleId: string): void {
        try {
            if (confirm("Are you sure you want to delete this module?")) {
                this.database.deleteDocument('modules', moduleId);
                alert("Module deleted successfully.");
                this.reload();
            }
        } catch (error) {
            console.error('Error deleting module:', error);
        }
    }
}