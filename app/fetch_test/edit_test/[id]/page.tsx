"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./edit.module.css"; // Import the CSS module for edit page

interface Organization {
  id: number;
  email: string;
  name: string;
  tel: string;
  adrs: string;
  post: string;
}

interface EditOrganizationProps {
  params: {
    id: string;
  };
}

const EditOrganization: React.FC<EditOrganizationProps> = ({ params }) => {
  const [org, setOrg] = useState<Partial<Organization>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchOrg = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/organization/${params.id}/`
        );
        setOrg(response.data);
      } catch (error) {
        setError("Error fetching organization details.");
        console.error("Error fetching organization:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrg();
  }, [params.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrg((prevOrg) => ({ ...prevOrg, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/organization/${params.id}/`,
        {
          email: org.email,
          name: org.name,
          tel: org.tel,
          adrs: org.adrs,
          post: org.post,
        }
      );
      alert("Organization updated successfully!");
      router.push("/fetch_test"); // Redirect to the fetch_test page
    } catch (error) {
      setError("Error updating organization.");
      console.error("Error updating organization:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Edit Organization</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={org.email || ""}
          onChange={handleInputChange}
          className={styles.input}
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={org.name || ""}
          onChange={handleInputChange}
          className={styles.input}
        />
        <input
          type="text"
          name="tel"
          placeholder="Telephone"
          value={org.tel || ""}
          onChange={handleInputChange}
          className={styles.input}
        />
        <input
          type="text"
          name="adrs"
          placeholder="Address"
          value={org.adrs || ""}
          onChange={handleInputChange}
          className={styles.input}
        />
        <input
          type="text"
          name="post"
          placeholder="Post"
          value={org.post || ""}
          onChange={handleInputChange}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Update Organization
        </button>
      </form>
    </div>
  );
};

export default EditOrganization;
