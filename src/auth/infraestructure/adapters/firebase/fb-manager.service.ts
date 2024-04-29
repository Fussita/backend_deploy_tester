import { Injectable } from "@nestjs/common";
import { doc, collection, setDoc, where, getDocs, query } from "firebase/firestore/lite";
import { fbDB } from "./config";
import { DbManagerInterface } from "src/auth/domain/out_dbmanager_interfaces";
import { dataUserDto } from "../../dtos/data_user";

@Injectable()
export class FBManager implements DbManagerInterface {
    
    async getUsers(): Promise<dataUserDto[]> {
        const collectionRef = collection( fbDB, 'users-data')
        const Query = query( collectionRef )
        let aux: dataUserDto[] = []
        const docsRec = await getDocs(Query)
        docsRec.forEach( doc => {
            const data = doc.data()
            aux.push({ 
                password: data.password, 
                email: data.email, 
                username: data.username, 
                photourl: data.photourl,
            })
        })    
        return aux
    }
    
    async registerUser(username: string, email: string, password: string, photourl: string) {
        const data = {
            email: email,
            password: password,
            username: username,
            photourl: photourl
        }
        const newDocRef = doc( collection( fbDB, 'users-data' ) )
        const res = await setDoc( newDocRef, data )
        console.log(res)
    }

    async findUserByUsername( username: string ): Promise<dataUserDto> {
        const collectionRef = collection( fbDB, 'users-data')
        const cond = where('username', "==", username)
        const Query = query( collectionRef, cond )
        let aux: dataUserDto = null
        const docsRec = await getDocs(Query)
        docsRec.forEach( doc => {
            const data = doc.data()
            aux = { 
                password: data.password, 
                email: data.email, 
                username: data.username, 
                photourl: data.photourl,
            }
        })    
        return aux
    }

    async findUserByEmail( email: string ): Promise<dataUserDto> {
        const collectionRef = collection( fbDB, 'users-data')
        const cond = where('email', "==", email)
        const Query = query( collectionRef, cond )
        let aux: dataUserDto = null
        const docsRec = await getDocs(Query)
        docsRec.forEach( doc => {
            const data = doc.data()
            aux = { 
                password: data.password, 
                email: data.email, 
                username: data.username, 
                photourl: data.photourl,
            }
        })    
        return aux
    }

}
