"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Emails = () => {
  const [emails, setEmails] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Ajouter un état de chargement

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user-emails/`);
        setEmails(response.data);
      } catch (error) {
        console.error("Error fetching emails:", error);
      } finally {
        setLoading(false); // Arrêter le chargement une fois les données récupérées
      }
    };

    fetchEmails();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Afficher le texte de chargement pendant que les données sont récupérées
  }

  return (
    <div>
      <h1>User Emails</h1>
      <ul>
        {emails.map((email, index) => (
          <li key={index}>{email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Emails;
