import { NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

if (!getApps().length) {
    initializeApp({
        credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
    });
}

const db = getFirestore();

export async function GET(request: Request) {
    const auth = getAuth();
    try {
        const token = request.headers.get('Authorization')?.split(' ')[1];
        const decodedToken = await auth.verifyIdToken(token!);
        const uid = decodedToken.uid;
        
        const companiesSnapshot = await db.collection('companies').where('OWNER_ID', '==', uid).get();
        if (companiesSnapshot.empty) {
            return NextResponse.json({ error: 'No companies found for this user' }, { status: 404 });
        }
        
        const companyDoc = companiesSnapshot.docs[0];
        const companyId = companyDoc.id;
        
        const usersSnapshot = await db.collection(`companies/${companyId}/users`)
            .where('checked_in', '==', true)
            .get();
            
        const users = usersSnapshot.docs.map(doc => ({
            userID: doc.id,
            ...doc.data(),
            checkInTime: doc.data().checkInTime?.toDate().toLocaleTimeString() || null
        }));

        const companyName = companyDoc.data().name;
        return NextResponse.json({ companyId, companyName, users });
    } catch (error) {
        console.error('Error fetching users in company:', error);
        return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
    }
}