import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  	title: "HSO -Dashboard",
  	description: "Análise do capital científico",
};

export default function RootLayout({ children }) {
  	return (
		<html lang="pt-br">
			<body className="bg-white h-screen">
				<Navbar/>
				<div className="flex-col p-5">
					<Toaster position="top-right" toastOptions={{ style: { borderColor: "#4c1d95", borderWidth: 2 } }}/>
					{children}
				</div>
			</body>
		</html>
	);
}
