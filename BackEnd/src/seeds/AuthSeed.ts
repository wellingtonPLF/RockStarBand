import { Auths } from "@prisma/client";

export const authSeed: Array<Auths>  = [
    {
        id: 1,
        email: "well@gmail.com",
        username: "well",
        password: "$2a$10$i6SuWZyO5erglw3NZOdwleQTMxdnzpbG6ORhPzdlT3/L9jcdsGb3i",
        active: true
    },
    {
        id: 2,
        email: "lara@gmail.com",
        username: "lara",
        password: "$2a$10$i6SuWZyO5erglw3NZOdwleQTMxdnzpbG6ORhPzdlT3/L9jcdsGb3i",
        active: false
    },
    {
        id: 3,
        email: "rosa@gmail.com",
        username: "rosa",
        password: "$2a$10$i6SuWZyO5erglw3NZOdwleQTMxdnzpbG6ORhPzdlT3/L9jcdsGb3i",
        active: false
    }
]