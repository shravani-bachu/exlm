import { getMetadata } from '../lib-franklin.js';
// eslint-disable-next-line import/no-cycle
import initializeSignupFlow from '../signup-flow/signup-flow.js';
// eslint-disable-next-line import/no-cycle
import { defaultProfileClient, isSignedInUser } from '../auth/profile.js';
import { getConfig } from '../scripts.js';

export default async function showSignupModal() {
  if (!isSignedInUser()) {
    return;
  }
  let configDateString = getMetadata('signup-flow-config-date');

  // Temporary fix for the case where the config date is not present in the metadata of a page
  if(!configDateString) {
    const { signUpFlowConfigDate } = getConfig();
    configDateString = signUpFlowConfigDate;
  }

  const configDate = new Date(configDateString);
  const profileData = await defaultProfileClient.getMergedProfile();
  const profileTimeStamp = new Date(profileData.timestamp);
  const modalSeen = await defaultProfileClient.getLatestInteraction('modalSeen');
  if (profileTimeStamp >= configDate && !modalSeen) {
    initializeSignupFlow();
  }
}

export async function addModalSeenInteraction() {
  const modelInteraction = await defaultProfileClient.getLatestInteraction('modalSeen');
  if (!modelInteraction) {
    const modalSeen = [{ event: 'modalSeen', timestamp: new Date().toISOString(), modalSeen: true }];
    await defaultProfileClient.updateProfile('interactions', modalSeen);
  }
}
