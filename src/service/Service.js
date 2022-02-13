import { db } from "../utils/firebase";

class DatabaseService {
    collection;

    // Specify 'hackathon', 'users', or 'tags' as collection name
    constructor(collectionName) {
        this.collection = db.collection(collectionName);
    }

    // returns list of records as an array of javascript objects
    getAll = async () => {
        const snapshot = await this.collection.get();
        return snapshot.docs.map((doc) => {
            return {
                id: doc.id, // append document id to each document
                ...doc.data(),
            };
        });
    };

    // returns a single document in object format
    getOne = async ({ queryKey }) => {
        const { id } = queryKey[1];
        if (!id) return; // entity form is in create mode
        const snapshot = await this.collection.doc(id).get();
        return snapshot.data();
    };

    getByField = async (field, value) => {
        const snapshot = await this.collection.where(field, "==", value).get();
        return snapshot.docs.map((doc) => {
            return {
                id: doc.id, // append document id to each document
                ...doc.data(),
            };
        });
    };

    // save a new document in the database
    create = async (data) => {
        return await this.collection.add(data)
            .then((doc) => {
                return {
                    id: doc.id, // append document id to each document
                    ...data,
                };
            });
    };

    // update an existing document with new data
    update = async (id, values) => {
        return await this.collection.doc(id).update(values);
    };

    // delete an existing document from the collection
    remove = async (id) => {
        return await this.collection.doc(id).delete();
    };
}

// Create services for each entity type
export const UserService = new DatabaseService("User");

export const HackathonService = new DatabaseService("Hackathon");

export const TagsService = new DatabaseService("Tags");