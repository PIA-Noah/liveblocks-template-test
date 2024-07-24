"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Import useRouter
import styles from "./fetch.module.css"; // Import the CSS module

interface Organization {
  id: number;
  email: string;
  name: string;
  tel: string;
  adrs: string;
  post: string;
}

const OrganizationComponent = () => {
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newOrg, setNewOrg] = useState<Partial<Organization>>({
    name: "",
    email: "",
    tel: "",
    adrs: "",
    post: "",
  });
  const router = useRouter(); // Initialize router

  useEffect(() => {
    fetchOrg();
  }, []);

  const fetchOrg = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/organization/`
      );
      setOrgs(response.data);
    } catch (error) {
      console.error("Error fetching organizations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewOrg((prevOrg) => ({ ...prevOrg, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/organization/`, {
        email: newOrg.email,
        name: newOrg.name,
        tel: newOrg.tel,
        adrs: newOrg.adrs,
        post: newOrg.post,
      });
      fetchOrg(); // Récupérer la liste mise à jour des organisations
      setNewOrg({
        name: "",
        email: "",
        tel: "",
        adrs: "",
        post: "",
      });
    } catch (error) {
      console.error("Error adding organization:", error);
    }
  };

  const deleteOrganization = async (id: number) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/organization/${id}/`
      );
      fetchOrg(); // Récupérer la liste mise à jour des organisations
    } catch (error) {
      console.error("Error deleting organization:", error);
    }
  };

  const editOrganization = (id: number) => {
    router.push(`/fetch_test/edit_test/${id}`); // Redirect to edit page
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Organizations</h1>
      <ul className={styles.ul}>
        {orgs.map((org) => (
          <li key={org.id} className={styles.li}>
            {org.name}
            <div className={styles.buttonGroup}>
              <button
                onClick={() => editOrganization(org.id)}
                className={styles.editButton}
              >
                Edit
              </button>
              <button
                onClick={() => deleteOrganization(org.id)}
                className={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newOrg.email || ""}
          onChange={handleInputChange}
          className={styles.input}
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newOrg.name || ""}
          onChange={handleInputChange}
          className={styles.input}
        />
        <input
          type="text"
          name="tel"
          placeholder="Telephone"
          value={newOrg.tel || ""}
          onChange={handleInputChange}
          className={styles.input}
        />
        <input
          type="text"
          name="adrs"
          placeholder="Address"
          value={newOrg.adrs || ""}
          onChange={handleInputChange}
          className={styles.input}
        />
        <input
          type="text"
          name="post"
          placeholder="Post"
          value={newOrg.post || ""}
          onChange={handleInputChange}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Add Organization
        </button>
      </form>
    </div>
  );
};

export default OrganizationComponent;
