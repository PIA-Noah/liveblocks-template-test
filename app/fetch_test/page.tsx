"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Organization = () => {
  const [orgs, setOrg] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Ajouter un état de chargement

  useEffect(() => {
    const fetchOrg = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/organization`
        );
        setOrg(response.data);
      } catch (error) {
        console.error("Error fetching emails:", error);
      } finally {
        setLoading(false); // Arrêter le chargement une fois les données récupérées
      }
    };

    fetchOrg();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Afficher le texte de chargement pendant que les données sont récupérées
  }

  return (
    <div>
      <h1>Organizations</h1>
      <ul>
        {orgs.map((org, name) => (
          <li key={name}>{org}</li>
        ))}
      </ul>
    </div>
  );
};

export default Organization;
