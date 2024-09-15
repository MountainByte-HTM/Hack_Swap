import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import Logo from "../assets/logo.jpg";
import { useAuth0 } from "@auth0/auth0-react";
const pictures = [
  "DSC00680",
  "DSC00933",
  "DSC00966",
  "DSC00983",
  "DSC01011",
  "DSC01040",
  "DSC01064",
  "DSC01071",
  "DSC01103",
  "DSC01145",
  "DSC01420",
  "DSC01461",
  "DSC01489",
  "DSC02031",
  "DSC02064",
  "DSC02069",
];

export const pageAtom = atom(0);
export const pages = [
  {
    front: "book-cover",
    back: pictures[0],
  },
];
for (let i = 1; i < pictures.length - 1; i += 2) {
  pages.push({
    front: pictures[i % pictures.length],
    back: pictures[(i + 1) % pictures.length],
  });
}

pages.push({
  front: pictures[pictures.length - 1],
  back: "book-back",
});

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);
  const { loginWithRedirect } = useAuth0();
  useEffect(() => {
    const audio = new Audio("/audios/page-flip-01a.mp3");
    audio.play();
  }, [page]);

  return (
    <main className="relative z-10 inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-red-200 to-gray-300">
      {/* Logo Section */}
      <div className="w-full flex justify-end -ml-10 my-1">
        <img src={Logo} alt="Book Exchange" className="w-24 h-24 rounded-full" />
      </div>

     
      <footer className="absolute bottom-8 text-center text-lg italic text-gray-600">
        <p className="font-bold text-xl text-black">
          "A room without books is like a body without a soul." – Cicero
        </p>
      </footer>
      
    </main>
  );
};
