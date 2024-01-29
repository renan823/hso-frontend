import useGet from "@/services/useGet";
import PageLoader from "./PageLoader";
import React from 'react';

export default function UploadsChart () {
    const { data, isLoading, isError } = useGet("/api/files/count");

    if (isLoading) {
        return (
            <PageLoader/>
        )
    }

    const files = data.files;
    const amount = data.amout;

    const labels = Object.keys(files);
    console.log(labels.map((label) => files[label]))



    return (
        <div className="bg-white rounded-md w-96 h-56">
            <div></div>
        </div>
    )
}