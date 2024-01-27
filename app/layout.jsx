import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  	title: "HSO -Dashboard",
  	description: "Análise do capital científico",
};

export default function RootLayout({ children }) {
  	return (
		<html lang="pt-br">
			<body>
				<Toaster position="top-right"/>
				{children}
			</body>
		</html>
	);
}
