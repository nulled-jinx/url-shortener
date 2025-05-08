import { useEffect, useState } from "react";

interface shortUrl {
  full: string;
  clicks: number;
  short: string;
}

const App = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [shortUrls, setShortUrls] = useState<shortUrl[]>();

  useEffect(() => {
    fetch(backendUrl)
      .then((res) => res.json())
      .then((data) => setShortUrls(data));
  }, []);

  return (
    <div>
      <h1>Shorten URL</h1>
      <h2>Paste the URL to be shortened</h2>
      <form action={`${backendUrl}/shortUrls`} method="POST">
        <input
          type="url"
          placeholder="Enter link"
          id="fullUrl"
          required
          name="fullUrl"
        />
        <button type="submit" id="submitUrl">
          Shorten URL
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Full Url</th>
            <th>Short Url</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {shortUrls &&
            shortUrls.map((shortUrl) => (
              <tr key={shortUrl.short}>
                <td>
                  <a href={shortUrl.full}>{shortUrl.full}</a>
                </td>
                <td>
                  <a href={`${backendUrl}/${shortUrl.short}`}>
                    {shortUrl.short}
                  </a>
                </td>
                <td>{shortUrl.clicks}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
