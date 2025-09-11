import { usePdf } from "@mikecousins/react-pdf";
import React, { useEffect, useRef, useState } from "react";
import Loaders from "../loading/loaders";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

export interface PdfReaderProps {
  url: string;
}

const PdfReader: React.FC<PdfReaderProps> = (props) => {
  const { url } = props;
  const [page, setPage] = useState(1);
  const canvasRef = useRef(null);

  const { pdfDocument, pdfPage } = usePdf({
    file: url,
    page,
    canvasRef,
  });

  useEffect(() => {
    setPage(1);
  }, [url]);

  return (
    <div className="flex flex-col gap-5">
      {!pdfDocument && (
        <div className="h-[100vh] items-center justify-center flex">
          <Loaders />
        </div>
      )}

      <div className="">
        <canvas ref={canvasRef} className="w-full" />
      </div>
      {Boolean(pdfDocument && pdfDocument.numPages) && (
        <>
          <div className="flex flex-row items-center gap-5 justify-between">
            <div className="previous">
              <Button
                size={"icon"}
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                <ChevronLeft />
              </Button>
            </div>
            {pdfPage && (
              <div className="page">
                <span>
                  Page {page} of {pdfDocument?.numPages}
                </span>
              </div>
            )}
            <div className="next">
              <Button
                size={"icon"}
                disabled={page === pdfDocument?.numPages}
                onClick={() => setPage(page + 1)}
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PdfReader;
