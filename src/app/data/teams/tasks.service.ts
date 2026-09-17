import { Service,inject } from '@angular/core';
import { Firestore,collection,addDoc,collectionData,doc,updateDoc,deleteDoc, query,orderBy, docData } from '@angular/fire/firestore';
import { NewTask, Task } from '../../models/task.model';
import { Observable } from 'rxjs';
import { Part } from 'firebase/ai';


@Service()
export class TasksService {
    constructor(){
        console.log('tasks collection path: ', this.taskCollection.path)
    }

    private firestore = inject(Firestore);
    private  taskCollection = collection(this.firestore,'tasks')


    //Create
    addTask(task: NewTask){
        
        return addDoc(this.taskCollection,task);
    }

    //Read 
    getTasks(): Observable<Task[]> {
        const q = query(this.taskCollection,orderBy('createdAt', 'desc'));
        return collectionData(q,{idField: 'id'}) as Observable<Task[]>
    }

    //Update
    updateTask(id: string, changes: Partial<NewTask>){
        
        return updateDoc(doc(this.firestore,'tasks',id),changes);
    }
    getTask(id:string): Observable<Task> {
        const ref = doc(this.firestore,'tasks',id);
        return docData(ref,{idField: 'id'}) as Observable<Task>
    }

    

    //delete
    deleteTask(id:string){
        
        return deleteDoc(doc(this.firestore,'tasks',id));
    }

}
