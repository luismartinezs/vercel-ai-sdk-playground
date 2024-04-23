'use client'
import { PartialOutline } from "@/lib/schema/outline";

type OutlineProps = PartialOutline;

const Outline = ({ title, outline }: OutlineProps): React.JSX.Element => {
  return (
    <div>
      <h2>{title}</h2>
      {outline?.map((item, index) => (
        <div key={index}>
          {item && (
            <>
              <h3>{item.title}</h3>
              {item.details && (
                <ul>
                  {item.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Outline;
